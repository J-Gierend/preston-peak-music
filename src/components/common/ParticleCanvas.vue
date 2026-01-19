<script setup lang="ts">
import { ref } from 'vue'
import { useParticles } from '../../composables/useParticles'

const canvasRef = ref<HTMLCanvasElement | null>(null)
useParticles(canvasRef)
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 pointer-events-none z-0"
    aria-hidden="true"
  />
</template>
