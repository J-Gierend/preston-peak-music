<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '../../composables/useScrollAnimation'

defineProps<{
  title: string
  subtitle?: string
  backgroundImage?: string
}>()

const { gsap } = useScrollAnimation()

onMounted(() => {
  gsap.from('.hero-title', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out'
  })
  gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
  })
})
</script>

<template>
  <section
    class="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
  >
    <!-- Background Image -->
    <div
      v-if="backgroundImage"
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    />

    <!-- Overlay -->
    <div
      class="absolute inset-0"
      :style="{
        background: 'linear-gradient(to bottom, rgba(var(--bg-primary-rgb), 0.7), rgba(var(--bg-primary-rgb), 0.5) 50%, rgba(var(--bg-primary-rgb), 1))'
      }"
    />

    <!-- Content -->
    <div class="relative z-10 text-center px-4 py-20">
      <h1 class="hero-title text-4xl md:text-6xl lg:text-7xl font-display font-bold text-[var(--text-primary)] mb-4">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="hero-subtitle text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
        {{ subtitle }}
      </p>
      <slot />
    </div>
  </section>
</template>
