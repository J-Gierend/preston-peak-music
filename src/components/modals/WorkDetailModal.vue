<script setup lang="ts">
import { watch, computed, onMounted, onUnmounted } from 'vue'
import SoundCloudEmbed from '../embeds/SoundCloudEmbed.vue'
import YouTubeEmbed from '../embeds/YouTubeEmbed.vue'

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
  sheetMusicAvailable?: boolean
  sheetMusicPrice?: string
  perusalScoreUrl?: string
  premiereInfo?: string
  links?: {
    youtube?: string
    soundcloud?: string
    spotify?: string
    appleMusic?: string
    amazonMusic?: string
    pandora?: string
    bandcamp?: string
    youtubeMusic?: string
  }
}

const props = defineProps<{
  work: Work | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

watch(() => props.isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

// Extract YouTube video ID from URL
const youtubeVideoId = computed(() => {
  const url = props.work?.links?.youtube
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
  return match ? match[1] : null
})

// Get SoundCloud URL (from links or direct property)
const soundcloudUrl = computed(() => {
  return props.work?.links?.soundcloud || props.work?.soundcloud
})

// Get Bandcamp URL (from links or direct property)
const bandcampUrl = computed(() => {
  return props.work?.links?.bandcamp || props.work?.bandcamp
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen && work"
        data-testid="work-modal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/70 backdrop-blur-sm"
          @click="emit('close')"
        />

        <!-- Modal -->
        <div class="relative bg-[var(--bg-secondary)] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
          <!-- Header -->
          <div class="sticky top-0 bg-[var(--bg-secondary)] border-b border-[var(--accent)]/20 p-6 flex items-start justify-between">
            <div>
              <h2 class="text-2xl font-display font-bold text-[var(--text-primary)]">
                {{ work.title }}
              </h2>
              <p class="text-[var(--text-secondary)]">{{ work.year }}</p>
            </div>
            <button
              @click="emit('close')"
              class="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Close"
            >
              <div class="i-carbon-close text-xl" />
            </button>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-6">
            <!-- Details -->
            <div class="flex flex-wrap gap-3">
              <span class="px-3 py-1 bg-[var(--accent)] text-[var(--bg-primary)] font-medium">
                {{ work.instrumentation }}
              </span>
              <span class="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                {{ work.duration }}
              </span>
            </div>

            <!-- Awards -->
            <div v-if="work.awards.length > 0" class="space-y-2">
              <h3 class="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Awards & Recognition
              </h3>
              <ul class="space-y-1">
                <li
                  v-for="award in work.awards"
                  :key="award"
                  class="flex items-center gap-2 text-[var(--accent)]"
                >
                  <div class="i-carbon-trophy" />
                  {{ award }}
                </li>
              </ul>
            </div>

            <!-- Description -->
            <p class="text-[var(--text-secondary)] leading-relaxed">
              {{ work.description }}
            </p>

            <!-- Listen Section -->
            <div v-if="youtubeVideoId || soundcloudUrl" class="space-y-4">
              <h3 class="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Listen
              </h3>

              <!-- YouTube Video (priority) -->
              <YouTubeEmbed v-if="youtubeVideoId" :video-id="youtubeVideoId" :title="work.title" />

              <!-- SoundCloud Embed (fallback - only if no YouTube) -->
              <SoundCloudEmbed v-else-if="soundcloudUrl" :url="soundcloudUrl" :title="work.title" />
            </div>

            <!-- Sheet Music Section -->
            <div v-if="work.sheetMusicAvailable" class="bg-[var(--bg-tertiary)] p-4 space-y-4">
              <h3 class="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Sheet Music
              </h3>

              <!-- Perusal Score -->
              <div v-if="work.perusalScoreUrl" class="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p class="text-[var(--text-primary)] font-medium">Preview Score</p>
                  <p class="text-sm text-[var(--text-secondary)]">Watermarked perusal copy for review</p>
                </div>
                <a
                  :href="work.perusalScoreUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline flex items-center gap-2"
                  data-testid="perusal-score-button"
                >
                  <div class="i-carbon-view" />
                  View Perusal Score
                </a>
              </div>

              <!-- Purchase -->
              <div class="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-[var(--accent)]/10">
                <div>
                  <p class="text-[var(--text-primary)] font-medium">Purchase Full Score</p>
                  <p v-if="work.sheetMusicPrice" class="text-sm text-[var(--accent)] font-semibold">{{ work.sheetMusicPrice }}</p>
                </div>
                <a
                  :href="`mailto:ppeakmusic@gmail.com?subject=Sheet Music Purchase: ${work.title}&body=Hi Preston,%0D%0A%0D%0AI would like to purchase the sheet music for '${work.title}'${work.sheetMusicPrice ? ' (' + work.sheetMusicPrice + ')' : ''}.%0D%0A%0D%0APlease let me know how to proceed with payment.%0D%0A%0D%0AThank you!`"
                  class="btn-primary flex items-center gap-2"
                  data-testid="sheet-music-button"
                >
                  <div class="i-carbon-document-pdf" />
                  Purchase
                </a>
              </div>
            </div>

            <!-- Streaming Links -->
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Stream
              </h3>
              <div class="flex flex-wrap gap-3">
                <a
                  v-if="work.links?.spotify"
                  :href="work.links.spotify"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline flex items-center gap-2"
                >
                  <div class="i-simple-icons-spotify" />
                  Spotify
                </a>
                <a
                  v-if="work.links?.appleMusic"
                  :href="work.links.appleMusic"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline flex items-center gap-2"
                >
                  <div class="i-simple-icons-applemusic" />
                  Apple Music
                </a>
                <a
                  v-if="work.links?.youtube"
                  :href="work.links.youtube"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline flex items-center gap-2"
                >
                  <div class="i-simple-icons-youtube" />
                  YouTube
                </a>
                <a
                  v-if="soundcloudUrl"
                  :href="soundcloudUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline flex items-center gap-2"
                >
                  <div class="i-simple-icons-soundcloud" />
                  SoundCloud
                </a>
                <a
                  v-if="bandcampUrl"
                  :href="bandcampUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline flex items-center gap-2"
                >
                  <div class="i-simple-icons-bandcamp" />
                  Bandcamp
                </a>
                <a
                  v-if="work.links?.amazonMusic"
                  :href="work.links.amazonMusic"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline flex items-center gap-2"
                >
                  <div class="i-simple-icons-amazonmusic" />
                  Amazon
                </a>
                <a
                  v-if="work.links?.pandora"
                  :href="work.links.pandora"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline flex items-center gap-2"
                >
                  <div class="i-carbon-music" />
                  Pandora
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
