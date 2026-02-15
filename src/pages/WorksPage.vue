<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentLoader } from '../composables/useContentLoader'
import { useTheme, type Aesthetic } from '../composables/useTheme'
import WorldToggle from '../components/WorldToggle.vue'
import FeaturedUpdate from '../components/sections/FeaturedUpdate.vue'
import WorldContentSection from '../components/sections/WorldContentSection.vue'
import WorkDetailModal from '../components/modals/WorkDetailModal.vue'
import PackDetailModal from '../components/modals/PackDetailModal.vue'
import './WorksPage.css'

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

interface ClassicalUpdate {
  type: 'youtube'
  title: string
  subtitle: string
  description: string
  youtubeId: string
  badge?: string
}

interface GamingUpdate {
  type: 'steam'
  title: string
  subtitle: string
  description: string
  steamUrl: string
  image?: string
  badge?: string
}

interface FeaturedUpdates {
  classical: ClassicalUpdate
  gaming: GamingUpdate
}

const route = useRoute()
const router = useRouter()
const { loadContent } = useContentLoader()
const { aesthetic, setWorld } = useTheme()

const currentWorld = aesthetic
const works = ref<Work[]>([])
const packs = ref<Pack[]>([])
const featuredUpdates = ref<FeaturedUpdates | null>(null)
const selectedWork = ref<Work | null>(null)
const selectedPack = ref<Pack | null>(null)
const isWorkModalOpen = ref(false)
const isPackModalOpen = ref(false)

onMounted(async () => {
  const [worksData, packsData, updatesData] = await Promise.all([
    loadContent<{ works: Work[] }>('/data/works.json'),
    loadContent<{ packs: Pack[] }>('/data/packs.json'),
    loadContent<FeaturedUpdates>('/data/featured-updates.json')
  ])
  if (worksData) works.value = worksData.works
  if (packsData) packs.value = packsData.packs
  if (updatesData) featuredUpdates.value = updatesData

  handleHash(route.hash)
})

watch(() => route.hash, handleHash)

function handleHash(hash: string) {
  if (!hash) return
  const slug = hash.slice(1)
  const work = works.value.find(w => w.slug === slug)
  if (work) {
    openWork(work.slug)
    return
  }
  const pack = packs.value.find(p => p.slug === slug)
  if (pack) {
    currentWorld.value = 'gaming'
    setWorld('gaming')
    openPack(pack.slug)
  }
}

function onWorldChange(world: Aesthetic) {
  setWorld(world)
}

function openWork(slug: string) {
  selectedWork.value = works.value.find(w => w.slug === slug) || null
  isWorkModalOpen.value = true
  router.replace({ hash: `#${slug}` })
}

function openPack(slug: string) {
  selectedPack.value = packs.value.find(p => p.slug === slug) || null
  isPackModalOpen.value = true
  router.replace({ hash: `#${slug}` })
}

function closeWorkModal() {
  isWorkModalOpen.value = false
  selectedWork.value = null
  router.replace({ hash: '' })
}

function closePackModal() {
  isPackModalOpen.value = false
  selectedPack.value = null
  router.replace({ hash: '' })
}
</script>

<template>
  <div class="works-page">
    <section class="works-hero">
      <h1 class="works-title">Works</h1>
      <p class="works-subtitle">Concert music, chamber works & game soundtracks</p>
      <div class="works-toggle">
        <WorldToggle
          v-model="currentWorld"
          @change="onWorldChange"
        />
      </div>
    </section>

    <FeaturedUpdate
      v-if="featuredUpdates"
      :world="currentWorld"
      :classical="featuredUpdates.classical"
      :gaming="featuredUpdates.gaming"
    />

    <WorldContentSection
      :world="currentWorld"
      @open-work="openWork"
      @open-pack="openPack"
    />

    <WorkDetailModal
      :work="selectedWork"
      :is-open="isWorkModalOpen"
      @close="closeWorkModal"
    />
    <PackDetailModal
      :pack="selectedPack"
      :is-open="isPackModalOpen"
      @close="closePackModal"
    />
  </div>
</template>
