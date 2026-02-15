<script setup lang="ts">
import TheNavigation from '../components/common/TheNavigation.vue'
import TheFooter from '../components/common/TheFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <TheNavigation />

    <main class="flex-1 pt-16 relative z-10">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>
