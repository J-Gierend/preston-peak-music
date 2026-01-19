<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLazyEmbed } from '../../composables/useLazyEmbed'
import EmbedFallback from './EmbedFallback.vue'

const props = defineProps<{
  videoId: string
  title?: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const { isVisible } = useLazyEmbed(containerRef)
const hasError = ref(false)
const isPlaying = ref(false)

const thumbnailUrl = computed(() => {
  return `https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`
})

const embedUrl = computed(() => {
  return `https://www.youtube.com/embed/${props.videoId}?autoplay=1&rel=0`
})

function play() {
  isPlaying.value = true
}

function handleError() {
  hasError.value = true
}
</script>

<template>
  <div ref="containerRef" class="aspect-video rounded-lg overflow-hidden bg-[var(--bg-secondary)] relative">
    <EmbedFallback
      v-if="hasError"
      platform="YouTube"
      :url="`https://youtube.com/watch?v=${videoId}`"
      :title="title"
    />

    <!-- Facade (before play) -->
    <button
      v-else-if="isVisible && !isPlaying"
      @click="play"
      class="w-full h-full relative group cursor-pointer"
      :aria-label="`Play: ${title || 'video'}`"
    >
      <img
        :src="thumbnailUrl"
        :alt="title || 'Video thumbnail'"
        class="w-full h-full object-cover"
        @error="handleError"
      />
      <div class="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <div class="i-carbon-play-filled text-white text-2xl ml-1" />
        </div>
      </div>
    </button>

    <!-- Actual embed (after play) -->
    <iframe
      v-else-if="isPlaying"
      :src="embedUrl"
      class="w-full h-full"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
    />

    <!-- Loading state -->
    <div v-else class="w-full h-full flex items-center justify-center">
      <div class="i-carbon-video text-4xl text-[var(--accent)] animate-pulse" />
    </div>
  </div>
</template>
