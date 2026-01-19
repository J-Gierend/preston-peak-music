<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentLoader } from '../composables/useContentLoader'
import HeroSection from '../components/sections/HeroSection.vue'
import DualPortalSection from '../components/sections/DualPortalSection.vue'
import FeaturedWorkSection from '../components/sections/FeaturedWorkSection.vue'
import WorkDetailModal from '../components/modals/WorkDetailModal.vue'
import PackDetailModal from '../components/modals/PackDetailModal.vue'

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

const works = ref<Work[]>([])
const packs = ref<Pack[]>([])
const selectedWork = ref<Work | null>(null)
const selectedPack = ref<Pack | null>(null)
const isWorkModalOpen = ref(false)
const isPackModalOpen = ref(false)

onMounted(async () => {
  const [worksData, packsData] = await Promise.all([
    loadContent<{ works: Work[] }>('/data/works.json'),
    loadContent<{ packs: Pack[] }>('/data/packs.json')
  ])
  if (worksData) works.value = worksData.works
  if (packsData) packs.value = packsData.packs

  // Handle hash on mount
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
    openPack(pack.slug)
  }
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
  <div>
    <HeroSection
      title="Preston Peak"
      subtitle="Post-classical composer creating music that bridges concert halls and gaming worlds."
      background-image="/images/01-hero-piano-starlight.jpg"
    >
      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <RouterLink to="/classical" class="btn-primary">
          Explore Classical
        </RouterLink>
        <RouterLink to="/games" class="btn-outline">
          Game Music
        </RouterLink>
      </div>
    </HeroSection>

    <DualPortalSection />
    <FeaturedWorkSection
      @open-work="openWork"
      @open-pack="openPack"
    />

    <!-- CTA Section -->
    <section class="py-20 px-4 bg-[var(--bg-secondary)]">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)] mb-4">
          Need Custom Music?
        </h2>
        <p class="text-lg text-[var(--text-secondary)] mb-8">
          Whether it's a concert piece, game soundtrack, or something unique, let's create something special together.
        </p>
        <RouterLink to="/contact" class="btn-primary text-lg px-8 py-3">
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
