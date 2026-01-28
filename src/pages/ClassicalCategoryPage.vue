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

const props = defineProps<{
  category: string
}>()

const route = useRoute()
const router = useRouter()
const { loadContent } = useContentLoader()
const baseUrl = import.meta.env.BASE_URL

const works = ref<Work[]>([])
const categories = ref<Category[]>([])
const selectedWork = ref<Work | null>(null)
const isModalOpen = ref(false)

const currentCategory = computed(() => {
  return categories.value.find(c => c.slug === props.category)
})

const filteredWorks = computed(() => {
  return works.value.filter(w => w.category === props.category)
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
  const work = filteredWorks.value.find(w => w.slug === slug)
  if (work) {
    openWork(work.slug)
  }
}

function openWork(slug: string) {
  selectedWork.value = filteredWorks.value.find(w => w.slug === slug) || null
  isModalOpen.value = true
  router.replace({ hash: `#${slug}` })
}

function closeModal() {
  isModalOpen.value = false
  selectedWork.value = null
  router.replace({ hash: '' })
}
</script>

<template>
  <div>
    <HeroSection
      :title="currentCategory?.name || 'Works'"
      :subtitle="currentCategory?.description || 'Classical compositions'"
      :background-image="`${baseUrl}images/backgrounds/hero-sheet-music.png`"
    />

    <section class="py-8 px-4 border-b border-[var(--accent)]/20">
      <div class="max-w-6xl mx-auto">
        <!-- Back to All Works -->
        <router-link
          to="/classical"
          class="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors mb-4"
        >
          <div class="i-carbon-arrow-left" />
          Back to All Works
        </router-link>

        <!-- Category Navigation -->
        <nav class="flex flex-wrap gap-2" aria-label="Categories">
          <router-link
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/classical/${cat.slug}`"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-all',
              cat.slug === category
                ? 'bg-[var(--accent)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--accent)]/20 hover:text-[var(--text-primary)]'
            ]"
          >
            {{ cat.name }}
          </router-link>
        </nav>
      </div>
    </section>

    <section class="py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <div v-if="filteredWorks.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <WorkCard
            v-for="work in filteredWorks"
            :key="work.slug"
            :work="work"
            @click="openWork"
          />
        </div>

        <div v-else class="text-center py-12">
          <div class="i-carbon-music text-6xl text-[var(--text-secondary)] mx-auto mb-4" />
          <p class="text-[var(--text-secondary)]">No works in this category yet.</p>
          <p class="text-sm text-[var(--text-secondary)] mt-2">Check back soon for new compositions!</p>
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
