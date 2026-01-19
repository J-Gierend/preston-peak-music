<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useContentLoader } from '../../composables/useContentLoader'
import WorkCard from './WorkCard.vue'
import MusicPackCard from './MusicPackCard.vue'

interface Work {
  slug: string
  title: string
  year: number
  duration: string
  instrumentation: string
  awards: string[]
  description: string
  featured: boolean
  soundcloud: string
  bandcamp: string
}

interface Pack {
  slug: string
  title: string
  tracks: number
  duration: string
  style: string[]
  price: string
  itchUrl: string
  preview: string
  description: string
  featured: boolean
}

const { loadContent } = useContentLoader()
const featuredWorks = ref<Work[]>([])
const featuredPacks = ref<Pack[]>([])

const emit = defineEmits<{
  openWork: [slug: string]
  openPack: [slug: string]
}>()

onMounted(async () => {
  const [worksData, packsData] = await Promise.all([
    loadContent<{ works: Work[] }>('/data/works.json'),
    loadContent<{ packs: Pack[] }>('/data/packs.json')
  ])

  if (worksData) {
    featuredWorks.value = worksData.works.filter(w => w.featured).slice(0, 2)
  }
  if (packsData) {
    featuredPacks.value = packsData.packs.filter(p => p.featured).slice(0, 2)
  }
})
</script>

<template>
  <section class="py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-display font-bold text-center text-[var(--text-primary)] mb-12">
        Featured Works
      </h2>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Classical Works -->
        <div>
          <h3 class="text-xl font-display font-semibold text-[var(--accent)] mb-6 flex items-center gap-2">
            <div class="i-carbon-music" />
            Classical
          </h3>
          <div class="space-y-4">
            <WorkCard
              v-for="work in featuredWorks"
              :key="work.slug"
              :work="work"
              @click="emit('openWork', $event)"
            />
          </div>
          <RouterLink
            to="/classical"
            class="inline-flex items-center gap-2 mt-6 text-[var(--accent)] hover:opacity-80 transition-opacity"
          >
            View all classical works
            <div class="i-carbon-arrow-right" />
          </RouterLink>
        </div>

        <!-- Game Music -->
        <div>
          <h3 class="text-xl font-display font-semibold text-[var(--accent)] mb-6 flex items-center gap-2">
            <div class="i-carbon-game-console" />
            Game Music
          </h3>
          <div class="space-y-4">
            <MusicPackCard
              v-for="pack in featuredPacks"
              :key="pack.slug"
              :pack="pack"
              @click="emit('openPack', $event)"
            />
          </div>
          <RouterLink
            to="/games"
            class="inline-flex items-center gap-2 mt-6 text-[var(--accent)] hover:opacity-80 transition-opacity"
          >
            View all music packs
            <div class="i-carbon-arrow-right" />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
