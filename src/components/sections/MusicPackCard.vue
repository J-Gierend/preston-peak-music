<script setup lang="ts">
interface Pack {
  slug: string
  title: string
  tracks: number
  duration: string
  style: string[]
  price: string
  itchUrl: string
  description: string
  featured: boolean
}

defineProps<{
  pack: Pack
}>()

const emit = defineEmits<{
  click: [slug: string]
}>()
</script>

<template>
  <article
    class="card card-hover cursor-pointer group relative overflow-hidden"
    @click="emit('click', pack.slug)"
  >
    <!-- Price Badge -->
    <div
      class="absolute top-4 right-4 px-3 py-1 text-sm font-bold"
      :class="pack.price === 'FREE' ? 'bg-green-500 text-white' : 'bg-[var(--accent)] text-[var(--bg-primary)]'"
    >
      {{ pack.price }}
    </div>

    <h3 class="text-lg font-display font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2 pr-16">
      {{ pack.title }}
    </h3>

    <div class="flex items-center gap-3 text-sm text-[var(--text-secondary)] mb-3">
      <span class="flex items-center gap-1">
        <div class="i-carbon-music" />
        {{ pack.tracks }} tracks
      </span>
      <span class="flex items-center gap-1">
        <div class="i-carbon-time" />
        {{ pack.duration }}
      </span>
    </div>

    <div class="flex flex-wrap gap-1 mb-3">
      <span
        v-for="tag in pack.style"
        :key="tag"
        class="px-2 py-0.5 text-xs bg-[var(--accent)]/20 text-[var(--bg-primary)] font-medium"
      >
        {{ tag }}
      </span>
    </div>

    <p class="text-sm text-[var(--text-secondary)] line-clamp-2">
      {{ pack.description }}
    </p>
  </article>
</template>
