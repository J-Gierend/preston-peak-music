<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLazyEmbed } from '../../composables/useLazyEmbed'
import EmbedFallback from './EmbedFallback.vue'

const props = defineProps<{
  url: string
  title?: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const { isVisible } = useLazyEmbed(containerRef)
const hasError = ref(false)

const embedUrl = computed(() => {
  const encoded = encodeURIComponent(props.url)
  return `https://w.soundcloud.com/player/?url=${encoded}&color=%23c9a85c&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`
})

function handleError() {
  hasError.value = true
}
</script>

<template>
  <div ref="containerRef" class="h-40 rounded-lg overflow-hidden bg-[var(--bg-secondary)]">
    <EmbedFallback
      v-if="hasError"
      platform="SoundCloud"
      :url="url"
      :title="title"
    />
    <iframe
      v-else-if="isVisible"
      :src="embedUrl"
      width="100%"
      height="100%"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      loading="lazy"
      @error="handleError"
    />
    <div v-else class="w-full h-full flex items-center justify-center">
      <div class="i-carbon-music text-4xl text-[var(--accent)] animate-pulse" />
    </div>
  </div>
</template>
