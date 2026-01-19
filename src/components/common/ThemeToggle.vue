<script setup lang="ts">
import { useTheme } from '../../composables/useTheme'

const { isDark, toggleDark } = useTheme()
</script>

<template>
  <button
    @click="toggleDark()"
    class="p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent)]/20 transition-colors"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <div v-if="isDark" class="i-carbon-sun text-lg" />
    <div v-else class="i-carbon-moon text-lg" />
  </button>
</template>
