<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import SoundCloudEmbed from '../embeds/SoundCloudEmbed.vue'

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
}

const props = defineProps<{
  pack: Pack | null
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
        v-if="isOpen && pack"
        data-testid="pack-modal"
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
                {{ pack.title }}
              </h2>
              <div class="flex items-center gap-3 mt-1 text-[var(--text-secondary)]">
                <span class="flex items-center gap-1">
                  <div class="i-carbon-music" />
                  {{ pack.tracks }} tracks
                </span>
                <span class="flex items-center gap-1">
                  <div class="i-carbon-time" />
                  {{ pack.duration }}
                </span>
              </div>
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
            <!-- Price & Tags -->
            <div class="flex flex-wrap items-center gap-3">
              <span
                class="px-4 py-2 rounded-lg text-lg font-bold"
                :class="pack.price === 'FREE' ? 'bg-green-500/20 text-green-400' : 'bg-[var(--accent)]/20 text-[var(--accent)]'"
              >
                {{ pack.price }}
              </span>
              <span
                v-for="tag in pack.style"
                :key="tag"
                class="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-lg text-sm"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Description -->
            <p class="text-[var(--text-secondary)] leading-relaxed">
              {{ pack.description }}
            </p>

            <!-- Preview -->
            <div>
              <h3 class="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">
                Preview
              </h3>
              <SoundCloudEmbed :url="pack.preview" :title="pack.title" />
            </div>

            <!-- CTA -->
            <a
              :href="pack.itchUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary w-full text-center flex items-center justify-center gap-2 py-4 text-lg"
            >
              <div class="i-simple-icons-itchdotio" />
              {{ pack.price === 'FREE' ? 'Download Free on itch.io' : `Get on itch.io - ${pack.price}` }}
            </a>
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
