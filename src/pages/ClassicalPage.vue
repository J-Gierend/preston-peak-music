<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentLoader } from '../composables/useContentLoader'
import HeroSection from '../components/sections/HeroSection.vue'
import WorkCard from '../components/sections/WorkCard.vue'
import WorkDetailModal from '../components/modals/WorkDetailModal.vue'

interface Work {
  slug: string
  title: string
  year: number
  duration: string
  instrumentation: string
  category: string
  awards: string[]
  soundcloud: string
  bandcamp: string
  description: string
  featured: boolean
  sheetMusicAvailable?: boolean
}

interface Category {
  slug: string
  name: string
  description: string
}

const route = useRoute()
const router = useRouter()
const { loadContent } = useContentLoader()
const baseUrl = import.meta.env.BASE_URL

const works = ref<Work[]>([])
const categories = ref<Category[]>([])
const selectedWork = ref<Work | null>(null)
const isModalOpen = ref(false)

const featuredWorks = computed(() => {
  return works.value.filter(w => w.featured)
})

const allWorks = computed(() => {
  // Sort: featured first, then by year descending
  return [...works.value].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return b.year - a.year
  })
})

onMounted(async () => {
  const data = await loadContent<{ works: Work[], categories: Category[] }>('/data/works.json')
  if (data) {
    works.value = data.works
    categories.value = data.categories
    handleHash(route.hash)
  }
})

watch(() => route.hash, handleHash)

function handleHash(hash: string) {
  if (!hash) return
  const slug = hash.slice(1)
  const work = works.value.find(w => w.slug === slug)
  if (work) {
    openWork(work.slug)
  }
}

function openWork(slug: string) {
  selectedWork.value = works.value.find(w => w.slug === slug) || null
  isModalOpen.value = true
  router.replace({ hash: `#${slug}` })
}

function closeModal() {
  isModalOpen.value = false
  selectedWork.value = null
  router.replace({ hash: '' })
}

function getCategoryWorkCount(categorySlug: string): number {
  return works.value.filter(w => w.category === categorySlug).length
}
</script>

<template>
  <div>
    <HeroSection
      title="Classical Works"
      subtitle="Concert music, chamber works, and solo pieces"
      :background-image="`${baseUrl}images/backgrounds/hero-sheet-music.jpg`"
    />

    <!-- Featured Works Section -->
    <section v-if="featuredWorks.length > 0" class="py-12 px-4 bg-[var(--bg-secondary)]">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-display font-bold text-[var(--text-primary)] mb-6">
          Featured Works
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <WorkCard
            v-for="work in featuredWorks"
            :key="work.slug"
            :work="work"
            @click="openWork"
            style="border: 2px solid var(--accent);"
          />
        </div>
      </div>
    </section>

    <!-- Category Navigation -->
    <section class="py-12 px-4 border-b border-[var(--accent)]/20">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-display font-bold text-[var(--text-primary)] mb-6">
          Browse by Category
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <router-link
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/classical/${cat.slug}`"
            class="group p-4 bg-[var(--bg-tertiary)] hover:bg-[var(--accent)]/20 transition-colors border border-transparent hover:border-[var(--accent)]/30"
          >
            <h3 class="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              {{ cat.name }}
            </h3>
            <p class="text-sm text-[var(--text-secondary)] mt-1">
              {{ getCategoryWorkCount(cat.slug) }} {{ getCategoryWorkCount(cat.slug) === 1 ? 'work' : 'works' }}
            </p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- All Works -->
    <section class="py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-display font-bold text-[var(--text-primary)] mb-6">
          All Works
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <WorkCard
            v-for="work in allWorks"
            :key="work.slug"
            :work="work"
            @click="openWork"
          />
        </div>

        <div v-if="works.length === 0" class="text-center py-12 text-[var(--text-secondary)]">
          No works found.
        </div>
      </div>
    </section>

    <WorkDetailModal
      :work="selectedWork"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>
