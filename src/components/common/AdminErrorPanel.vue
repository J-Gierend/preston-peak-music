<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useContentLoader } from '../../composables/useContentLoader'

const route = useRoute()
const { errors, clearErrors } = useContentLoader()

const isAdmin = computed(() => route.query.admin === 'true')
const hasErrors = computed(() => errors.value.length > 0)
</script>

<template>
  <Transition name="slide">
    <div
      v-if="isAdmin && hasErrors"
      class="fixed bottom-4 right-4 z-50 max-w-md bg-red-900/95 backdrop-blur-sm shadow-xl border border-red-500/50 p-4"
    >
      <div class="flex items-start justify-between mb-3">
        <h3 class="text-red-200 font-semibold flex items-center gap-2">
          <div class="i-carbon-warning text-lg" />
          Content Errors
        </h3>
        <button
          @click="clearErrors"
          class="text-red-300 hover:text-white"
          aria-label="Dismiss"
        >
          <div class="i-carbon-close" />
        </button>
      </div>

      <ul class="space-y-2 text-sm">
        <li
          v-for="(error, index) in errors"
          :key="index"
          class="bg-red-950/50 p-2"
        >
          <div class="text-red-200 font-mono text-xs mb-1">
            {{ error.file }}
          </div>
          <div class="text-red-100">
            {{ error.message }}
          </div>
        </li>
      </ul>

      <p class="mt-3 text-xs text-red-300">
        Fix the JSON files and refresh. Cached content is being displayed.
      </p>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
