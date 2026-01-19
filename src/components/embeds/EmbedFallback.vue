<script setup lang="ts">
defineProps<{
  platform: string
  url: string
  title?: string
}>()
</script>

<template>
  <div class="bg-[var(--bg-secondary)] rounded-lg p-6 text-center">
    <div class="i-carbon-music text-4xl text-[var(--accent)] mb-3 mx-auto" />
    <p class="text-[var(--text-secondary)] mb-4">
      {{ title || 'Track unavailable' }}
    </p>
    <a
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-[var(--bg-primary)] rounded-lg hover:opacity-90 transition-opacity"
    >
      Listen on {{ platform }}
      <div class="i-carbon-arrow-right" />
    </a>
  </div>
</template>
