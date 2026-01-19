<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentLoader } from '../composables/useContentLoader'
import { useTheme, type Aesthetic } from '../composables/useTheme'
import HeroSection from '../components/sections/HeroSection.vue'
import WorldToggle from '../components/WorldToggle.vue'
import WorldContentSection from '../components/sections/WorldContentSection.vue'
import WorkDetailModal from '../components/modals/WorkDetailModal.vue'
import PackDetailModal from '../components/modals/PackDetailModal.vue'
import './HomePage.css'

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

const route = useRoute()
const router = useRouter()
const { loadContent } = useContentLoader()
const { aesthetic, setWorld } = useTheme()
const baseUrl = import.meta.env.BASE_URL

// Use global aesthetic state so nav toggle and page cards stay synced
const currentWorld = aesthetic
const works = ref<Work[]>([])
const packs = ref<Pack[]>([])
const selectedWork = ref<Work | null>(null)
const selectedPack = ref<Pack | null>(null)
const isWorkModalOpen = ref(false)
const isPackModalOpen = ref(false)

const heroBackground = computed(() => {
  const bgName = currentWorld.value === 'classical'
    ? 'hero-sheet-music.png'
    : 'hero-gaming.png'
  return `${baseUrl}images/backgrounds/${bgName}`
})

const heroSubtitle = computed(() => {
  return currentWorld.value === 'classical'
    ? 'Post-classical composer creating music that bridges concert halls and gaming worlds.'
    : 'Royalty-free soundtracks and music packs for indie game developers.'
})

onMounted(async () => {
  const [worksData, packsData] = await Promise.all([
    loadContent<{ works: Work[] }>('/data/works.json'),
    loadContent<{ packs: Pack[] }>('/data/packs.json')
  ])
  if (worksData) works.value = worksData.works
  if (packsData) packs.value = packsData.packs

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
  <div class="homepage">
    <HeroSection
      title="Preston Peak"
      :subtitle="heroSubtitle"
      :background-image="heroBackground"
    >
      <div class="hero-actions">
        <WorldToggle
          v-model="currentWorld"
          @change="onWorldChange"
        />
      </div>
    </HeroSection>

    <WorldContentSection
      :world="currentWorld"
      @open-work="openWork"
      @open-pack="openPack"
    />

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-container">
        <h2 class="cta-title">
          Need Custom Music?
        </h2>
        <p class="cta-description">
          Whether it's a concert piece, game soundtrack, or something unique,
          let's create something special together.
        </p>
        <RouterLink to="/contact" class="cta-button">
          Start a Commission
        </RouterLink>
      </div>
    </section>

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
