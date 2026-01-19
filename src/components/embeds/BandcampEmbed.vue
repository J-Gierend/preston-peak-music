<script setup lang="ts">
import { ref } from 'vue'
import { useLazyEmbed } from '../../composables/useLazyEmbed'
import EmbedFallback from './EmbedFallback.vue'

const props = defineProps<{
  url: string
  title?: string
  albumId?: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const { isVisible } = useLazyEmbed(containerRef)
const hasError = ref(false)

function handleError() {
  hasError.value = true
}
</script>

<template>
  <div ref="containerRef" class="rounded-lg overflow-hidden bg-[var(--bg-secondary)]">
    <EmbedFallback
      v-if="hasError || !albumId"
      platform="Bandcamp"
      :url="url"
      :title="title"
    />
    <iframe
      v-else-if="isVisible && albumId"
      :src="`https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=1a2a3a/linkcol=c9a85c/tracklist=false/artwork=small/transparent=true/`"
      style="border: 0; width: 100%; height: 120px;"
      seamless
      loading="lazy"
      @error="handleError"
    />
    <div v-else class="w-full h-[120px] flex items-center justify-center">
      <div class="i-carbon-music text-4xl text-[var(--accent)] animate-pulse" />
    </div>
  </div>
</template>
