import { ref, watch, onMounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

export type Aesthetic = 'classical' | 'gaming'

const aesthetic = ref<Aesthetic>('classical')
const isDark = useDark()
const toggleDark = useToggle(isDark)

export function useTheme() {
  const setAesthetic = (value: Aesthetic) => {
    aesthetic.value = value
    document.documentElement.setAttribute('data-aesthetic', value)
  }

  const setWorld = (world: Aesthetic) => {
    setAesthetic(world)
    // Classical = can be light or dark, Gaming = always dark
    if (world === 'gaming' && !isDark.value) {
      toggleDark()
    }
  }

  onMounted(() => {
    document.documentElement.setAttribute('data-aesthetic', aesthetic.value)
  })

  watch(isDark, (dark) => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, { immediate: true })

  return {
    aesthetic,
    isDark,
    setAesthetic,
    setWorld,
    toggleDark
  }
}
