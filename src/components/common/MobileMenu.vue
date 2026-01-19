<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

interface NavLink {
  to: string
  label: string
}

const props = defineProps<{
  isOpen: boolean
  links: NavLink[]
}>()

const emit = defineEmits<{
  close: []
}>()

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

watch(() => props.isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 md:hidden"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="emit('close')"
      />

      <!-- Menu Panel -->
      <div class="absolute inset-y-0 right-0 w-full max-w-xs bg-[var(--bg-primary)] shadow-xl">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-[var(--accent)]/20">
          <span class="text-lg font-display font-bold text-[var(--accent)]">Menu</span>
          <button
            @click="emit('close')"
            class="p-2 text-[var(--text-primary)]"
            aria-label="Close menu"
          >
            <div class="i-carbon-close text-xl" />
          </button>
        </div>

        <!-- Links -->
        <nav class="p-4">
          <ul class="space-y-2">
            <li v-for="link in links" :key="link.to">
              <RouterLink
                :to="link.to"
                class="block px-4 py-3 rounded-lg text-[var(--text-primary)] hover:bg-[var(--accent)]/10 transition-colors"
                active-class="bg-[var(--accent)]/20 text-[var(--accent)]"
                @click="emit('close')"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Theme Toggle -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--accent)]/20">
          <div class="flex items-center justify-between">
            <span class="text-sm text-[var(--text-secondary)]">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
