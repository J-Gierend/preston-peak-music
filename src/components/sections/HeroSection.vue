<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  title: string
  subtitle?: string
  backgroundImage?: string
}>()

const currentBg = ref(props.backgroundImage)

watch(() => props.backgroundImage, (newBg, oldBg) => {
  if (newBg !== oldBg) {
    currentBg.value = newBg
  }
})
</script>

<template>
  <section
    data-testid="hero-section"
    class="hero-section"
  >
    <!-- Background Image with Transition -->
    <div
      v-if="currentBg"
      data-testid="hero-background"
      class="hero-background"
      :style="{ backgroundImage: `url(${currentBg})` }"
    />

    <!-- Overlay -->
    <div class="hero-overlay" />

    <!-- Content -->
    <div class="hero-content">
      <h1 class="hero-title">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="hero-subtitle">
        {{ subtitle }}
      </p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(var(--bg-primary-rgb), 0.7),
    rgba(var(--bg-primary-rgb), 0.5) 50%,
    rgba(var(--bg-primary-rgb), 1)
  );
  transition: background 0.5s ease;
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 5rem 1rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.1;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 4rem;
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 5rem;
  }
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 42rem;
  margin: 0 auto;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .hero-subtitle {
    font-size: 1.25rem;
  }
}
</style>
