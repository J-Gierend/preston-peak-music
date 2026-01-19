<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentLoader } from '../composables/useContentLoader'
import HeroSection from '../components/sections/HeroSection.vue'
import MusicPackCard from '../components/sections/MusicPackCard.vue'
import PackDetailModal from '../components/modals/PackDetailModal.vue'

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
const baseUrl = import.meta.env.BASE_URL

const packs = ref<Pack[]>([])
const selectedPack = ref<Pack | null>(null)
const isModalOpen = ref(false)

onMounted(async () => {
  const data = await loadContent<{ packs: Pack[] }>('/data/packs.json')
  if (data) {
    packs.value = data.packs
    handleHash(route.hash)
  }
})

watch(() => route.hash, handleHash)

function handleHash(hash: string) {
  if (!hash) return
  const slug = hash.slice(1)
  const pack = packs.value.find(p => p.slug === slug)
  if (pack) {
    openPack(pack.slug)
  }
}

function openPack(slug: string) {
  selectedPack.value = packs.value.find(p => p.slug === slug) || null
  isModalOpen.value = true
  router.replace({ hash: `#${slug}` })
}

function closeModal() {
  isModalOpen.value = false
  selectedPack.value = null
  router.replace({ hash: '' })
}
</script>

<template>
  <div>
    <HeroSection
      title="Game Music"
      subtitle="Soundtracks and music packs for your games"
      :background-image="`${baseUrl}images/backgrounds/hero-gaming.png`"
    />

    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Filter Info -->
        <p class="text-center text-[var(--text-secondary)] mb-12">
          All music packs available on
          <a
            href="https://ppeak.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--accent)] hover:opacity-80"
          >
            itch.io
          </a>
        </p>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MusicPackCard
            v-for="pack in packs"
            :key="pack.slug"
            :pack="pack"
            @click="openPack"
          />
        </div>

        <div v-if="packs.length === 0" class="text-center py-12 text-[var(--text-secondary)]">
          No packs found.
        </div>
      </div>
    </section>

    <PackDetailModal
      :pack="selectedPack"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>
