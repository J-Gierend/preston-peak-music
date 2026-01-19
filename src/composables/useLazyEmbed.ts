import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useLazyEmbed(elementRef: Ref<HTMLElement | null>) {
  const isVisible = ref(false)
  const hasLoaded = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!elementRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded.value) {
            isVisible.value = true
            hasLoaded.value = true
            observer?.disconnect()
          }
        })
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    )

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    isVisible,
    hasLoaded
  }
}
