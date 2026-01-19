<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const route = useRoute()
const { aesthetic } = useTheme()
const baseUrl = import.meta.env.BASE_URL

const currentBg = ref('')
const isTransitioning = ref(false)

// Map routes to page-specific backgrounds
const pageBackgrounds: Record<string, string> = {
  '/about': 'hero-about.png',
  '/listen': 'hero-listen.png',
  '/news': 'hero-news.png',
  '/contact': 'hero-contact.png'
}

// Only show background image on homepage - other pages use HeroSection
const isHomepage = computed(() => route.path === '/' || route.path === '')

const backgroundImage = computed(() => {
  // Only homepage gets the themed background image
  // Other pages have their own HeroSection with contained backgrounds
  if (!isHomepage.value) {
    return ''
  }

  return aesthetic.value === 'classical'
    ? `${baseUrl}images/backgrounds/hero-sheet-music.png`
    : `${baseUrl}images/backgrounds/hero-gaming.png`
})

// Watch for theme changes and transition smoothly
watch(backgroundImage, (newBg) => {
  isTransitioning.value = true
  setTimeout(() => {
    currentBg.value = newBg
    setTimeout(() => {
      isTransitioning.value = false
    }, 50)
  }, 200)
}, { immediate: true })
</script>

<template>
  <div class="themed-background" :class="aesthetic">
    <div
      class="background-image"
      :class="{ transitioning: isTransitioning }"
      :style="{ backgroundImage: `url(${currentBg})` }"
    />
    <div class="background-overlay" />

    <!-- Floating particles/notes -->
    <div class="particles">
      <div
        v-for="i in 12"
        :key="i"
        class="particle"
        :class="`particle-${i}`"
      >
        <span v-if="aesthetic === 'classical'" class="note">♪</span>
        <span v-else class="pixel-dot" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.themed-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.background-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.4;
  transition: opacity 0.4s ease;
}

.background-image.transitioning {
  opacity: 0;
}

.gaming .background-image {
  opacity: 0.5;
}

.background-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 40%,
    var(--bg-primary) 100%
  );
}

/* Floating particles */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  opacity: 0;
  animation: float-up 15s infinite ease-in-out;
}

.note {
  font-size: 1.5rem;
  color: var(--accent);
  opacity: 0.4;
  font-family: serif;
}

.gaming .note {
  font-family: var(--font-pixel), monospace;
  font-size: 1rem;
  text-shadow: 0 0 8px var(--accent);
}

.pixel-dot {
  display: block;
  width: 8px;
  height: 8px;
  background: var(--accent);
  opacity: 0.5;
  box-shadow: 0 0 12px var(--accent);
}

/* Stagger particle positions and timing */
.particle-1 { left: 5%; animation-delay: 0s; }
.particle-2 { left: 15%; animation-delay: 1.2s; }
.particle-3 { left: 25%; animation-delay: 2.4s; }
.particle-4 { left: 35%; animation-delay: 3.6s; }
.particle-5 { left: 45%; animation-delay: 4.8s; }
.particle-6 { left: 55%; animation-delay: 6s; }
.particle-7 { left: 65%; animation-delay: 7.2s; }
.particle-8 { left: 75%; animation-delay: 8.4s; }
.particle-9 { left: 85%; animation-delay: 9.6s; }
.particle-10 { left: 92%; animation-delay: 10.8s; }
.particle-11 { left: 10%; animation-delay: 12s; }
.particle-12 { left: 80%; animation-delay: 13.2s; }

@keyframes float-up {
  0% {
    bottom: -10%;
    opacity: 0;
    transform: translateX(0) rotate(0deg);
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    bottom: 110%;
    opacity: 0;
    transform: translateX(30px) rotate(15deg);
  }
}

/* Gaming mode has more dynamic animation */
.gaming .particle {
  animation: float-up-gaming 12s infinite ease-in-out;
}

@keyframes float-up-gaming {
  0% {
    bottom: -10%;
    opacity: 0;
    transform: translateX(0) scale(1);
  }
  10% {
    opacity: 0.8;
  }
  50% {
    transform: translateX(20px) scale(1.2);
  }
  90% {
    opacity: 0.8;
  }
  100% {
    bottom: 110%;
    opacity: 0;
    transform: translateX(-10px) scale(0.8);
  }
}
</style>
