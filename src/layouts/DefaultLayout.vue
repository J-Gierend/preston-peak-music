<script setup lang="ts">
import TheNavigation from '../components/common/TheNavigation.vue'
import TheFooter from '../components/common/TheFooter.vue'
import ParticleCanvas from '../components/common/ParticleCanvas.vue'
import ThemedBackground from '../components/ThemedBackground.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <ThemedBackground />
    <ParticleCanvas />
    <TheNavigation />

    <main class="flex-1 pt-16 relative z-10">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>
