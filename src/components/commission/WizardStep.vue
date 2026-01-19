<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  stepNumber: number
  totalSteps: number
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- Progress -->
    <div class="flex items-center gap-2 mb-8">
      <template v-for="i in totalSteps" :key="i">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors"
          :class="i <= stepNumber
            ? 'bg-[var(--accent)] text-[var(--bg-primary)]'
            : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'"
        >
          {{ i }}
        </div>
        <div
          v-if="i < totalSteps"
          class="flex-1 h-1 rounded transition-colors"
          :class="i < stepNumber ? 'bg-[var(--accent)]' : 'bg-[var(--bg-tertiary)]'"
        />
      </template>
    </div>

    <!-- Header -->
    <div>
      <h2 class="text-2xl font-display font-bold text-[var(--text-primary)]">
        {{ title }}
      </h2>
      <p v-if="description" class="text-[var(--text-secondary)] mt-1">
        {{ description }}
      </p>
    </div>

    <!-- Content -->
    <slot />
  </div>
</template>
