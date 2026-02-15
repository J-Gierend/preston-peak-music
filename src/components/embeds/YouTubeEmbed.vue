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
  <div ref="containerRef" class="youtube-embed">
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
      class="youtube-facade"
      :aria-label="`Play: ${title || 'video'}`"
    >
      <img
        :src="thumbnailUrl"
        :alt="title || 'Video thumbnail'"
        class="youtube-thumbnail"
        @error="handleError"
      />
      <div class="youtube-overlay" />
      <div class="youtube-play-container">
        <!-- Official YouTube-style play button -->
        <svg class="youtube-play-btn" viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg">
          <path class="youtube-play-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#FF0000"/>
          <path class="youtube-play-icon" d="M 45,24 27,14 27,34" fill="#FFFFFF"/>
        </svg>
      </div>
    </button>

    <!-- Actual embed (after play) -->
    <iframe
      v-else-if="isPlaying"
      :src="embedUrl"
      class="youtube-iframe"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
    />

    <!-- Loading state -->
    <div v-else class="youtube-loading">
      <div class="i-carbon-video loading-icon" />
    </div>
  </div>
</template>

<style scoped>
.youtube-embed {
  aspect-ratio: 16 / 9;
  border-radius: 0;
  overflow: hidden;
  background: var(--bg-secondary);
  position: relative;
}

.youtube-facade {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  border: none;
  padding: 0;
  background: none;
}

.youtube-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.youtube-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  transition: background 0.2s ease;
}

.youtube-facade:hover .youtube-overlay {
  background: rgba(0, 0, 0, 0.35);
}

.youtube-play-container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.youtube-play-btn {
  width: 68px;
  height: 48px;
}

.youtube-facade:hover .youtube-play-btn {
  opacity: 0.9;
}

.youtube-play-bg {
  transition: fill 0.15s ease;
}

.youtube-facade:hover .youtube-play-bg {
  fill: #FF0000;
}

.youtube-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.youtube-loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-icon {
  font-size: 2.5rem;
  color: var(--accent);
  opacity: 0.5;
}
</style>
