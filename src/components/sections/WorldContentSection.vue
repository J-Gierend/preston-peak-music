<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useContentLoader } from '../../composables/useContentLoader'
import WorkCard from './WorkCard.vue'
import MusicPackCard from './MusicPackCard.vue'
import './WorldContentSection.css'

type World = 'classical' | 'gaming'

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

const props = defineProps<{
  world: World
}>()

const emit = defineEmits<{
  openWork: [slug: string]
  openPack: [slug: string]
}>()

const { loadContent } = useContentLoader()
const works = ref<Work[]>([])
const packs = ref<Pack[]>([])
const isTransitioning = ref(false)

const showClassical = computed(() => props.world === 'classical')
const sectionTitle = computed(() =>
  showClassical.value ? 'Classical Works' : 'Game Music Packs'
)

onMounted(async () => {
  const [worksData, packsData] = await Promise.all([
    loadContent<{ works: Work[] }>('/data/works.json'),
    loadContent<{ packs: Pack[] }>('/data/packs.json')
  ])
  if (worksData) works.value = worksData.works
  if (packsData) packs.value = packsData.packs
})

watch(() => props.world, () => {
  isTransitioning.value = true
  setTimeout(() => {
    isTransitioning.value = false
  }, 300)
})
</script>

<template>
  <section
    data-testid="world-content-section"
    class="content-section"
    :class="{ transitioning: isTransitioning }"
  >
    <div class="section-container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="header-accent" />
        <h2 class="section-title">
          <span class="title-icon">
            <span v-if="showClassical">&#9834;</span>
            <span v-else>&#127918;</span>
          </span>
          {{ sectionTitle }}
        </h2>
        <p class="section-subtitle">
          <template v-if="showClassical">
            Concert music and chamber works for the modern era
          </template>
          <template v-else>
            Royalty-free soundtracks for your games
          </template>
        </p>
      </div>

      <!-- Classical Works Grid -->
      <div
        v-if="showClassical"
        data-testid="classical-works-grid"
        class="content-grid works-grid"
      >
        <WorkCard
          v-for="work in works"
          :key="work.slug"
          :work="work"
          data-testid="work-card"
          @click="emit('openWork', $event)"
        />
      </div>

      <!-- Gaming Packs Grid -->
      <div
        v-else
        data-testid="gaming-packs-grid"
        class="content-grid packs-grid"
      >
        <MusicPackCard
          v-for="pack in packs"
          :key="pack.slug"
          :pack="pack"
          data-testid="pack-card"
          @click="emit('openPack', $event)"
        />
      </div>

      <!-- Empty State -->
      <div
        v-if="(showClassical && works.length === 0) || (!showClassical && packs.length === 0)"
        class="empty-state"
      >
        <p>No content available yet.</p>
      </div>
    </div>
  </section>
</template>
