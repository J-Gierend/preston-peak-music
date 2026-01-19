<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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
  awards: string[]
  soundcloud: string
  bandcamp: string
  description: string
  featured: boolean
}

const route = useRoute()
const router = useRouter()
const { loadContent } = useContentLoader()
const baseUrl = import.meta.env.BASE_URL

const works = ref<Work[]>([])
const selectedWork = ref<Work | null>(null)
const isModalOpen = ref(false)

onMounted(async () => {
  const data = await loadContent<{ works: Work[] }>('/data/works.json')
  if (data) {
    works.value = data.works
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
</script>

<template>
  <div>
    <HeroSection
      title="Classical Works"
      subtitle="Concert music, chamber works, and solo pieces"
      :background-image="`${baseUrl}images/backgrounds/hero-sheet-music.png`"
    />

    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <WorkCard
            v-for="work in works"
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
