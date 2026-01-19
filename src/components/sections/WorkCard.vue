<script setup lang="ts">
interface Work {
  slug: string
  title: string
  year: number
  duration: string
  instrumentation: string
  awards: string[]
  description: string
  featured: boolean
}

defineProps<{
  work: Work
}>()

const emit = defineEmits<{
  click: [slug: string]
}>()
</script>

<template>
  <article
    class="card card-hover cursor-pointer group"
    @click="emit('click', work.slug)"
  >
    <div class="flex items-start justify-between mb-3">
      <h3 class="text-lg font-display font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
        {{ work.title }}
      </h3>
      <span class="text-sm text-[var(--text-muted)]">{{ work.year }}</span>
    </div>

    <div class="flex flex-wrap gap-2 mb-3">
      <span class="px-2 py-1 text-xs bg-[var(--accent)]/20 text-[var(--accent)] rounded">
        {{ work.instrumentation }}
      </span>
      <span class="px-2 py-1 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded">
        {{ work.duration }}
      </span>
    </div>

    <p class="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
      {{ work.description }}
    </p>

    <div v-if="work.awards.length > 0" class="flex items-center gap-1 text-xs text-[var(--accent)]">
      <div class="i-carbon-trophy" />
      <span>{{ work.awards[0] }}</span>
    </div>
  </article>
</template>
