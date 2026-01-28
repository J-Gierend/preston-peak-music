<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import SoundCloudEmbed from '../embeds/SoundCloudEmbed.vue'

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
        <div class="relative bg-[var(--bg-secondary)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
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
              <span class="px-3 py-1 bg-[var(--accent)] text-[var(--bg-primary)] font-medium rounded-lg">
                {{ work.instrumentation }}
              </span>
              <span class="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-lg">
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

            <!-- Embed -->
            <div>
              <h3 class="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">
                Listen
              </h3>
              <SoundCloudEmbed :url="work.soundcloud" :title="work.title" />
            </div>

            <!-- Sheet Music Purchase -->
            <div v-if="work.sheetMusicAvailable" class="bg-[var(--bg-tertiary)] rounded-xl p-4">
              <div class="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 class="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-1">
                    Sheet Music
                  </h3>
                  <p class="text-[var(--text-primary)]">Sheet music available for purchase</p>
                </div>
                <a
                  :href="`mailto:prestonpeak@email.com?subject=Sheet Music Inquiry: ${work.title}&body=Hi Preston,%0D%0A%0D%0AI'm interested in purchasing the sheet music for '${work.title}'.%0D%0A%0D%0APlease let me know the price and how I can purchase it.%0D%0A%0D%0AThank you!`"
                  class="btn-primary flex items-center gap-2"
                  data-testid="sheet-music-button"
                >
                  <div class="i-carbon-document-pdf" />
                  Purchase Sheet Music
                </a>
              </div>
            </div>

            <!-- Links -->
            <div class="flex flex-wrap gap-3">
              <a
                :href="work.soundcloud"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-outline flex items-center gap-2"
              >
                <div class="i-simple-icons-soundcloud" />
                SoundCloud
              </a>
              <a
                :href="work.bandcamp"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-outline flex items-center gap-2"
              >
                <div class="i-simple-icons-bandcamp" />
                Bandcamp
              </a>
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

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(20px);
}
</style>
