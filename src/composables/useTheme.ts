import { ref, watch, onMounted } from 'vue'
import { useStorage } from '@vueuse/core'

export type Aesthetic = 'classical' | 'gaming'

// Persist world selection to localStorage
const world = useStorage<Aesthetic>('preston-peak-world', 'classical')

export function useTheme() {
  // Compute dark mode based on world
  const isDark = ref(world.value === 'gaming')

  const setWorld = (newWorld: Aesthetic) => {
    world.value = newWorld
    isDark.value = newWorld === 'gaming'
    applyTheme()
  }

  const applyTheme = () => {
    document.documentElement.setAttribute('data-aesthetic', world.value)
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  }

  // Initialize on mount
  onMounted(() => {
    applyTheme()
  })

  // Watch for changes
  watch(world, applyTheme, { immediate: true })

  return {
    aesthetic: world,
    isDark,
    setAesthetic: setWorld,
    setWorld
  }
}
