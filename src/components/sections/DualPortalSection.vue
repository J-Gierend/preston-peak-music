<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const hoveredSide = ref<'classical' | 'gaming' | null>(null)
</script>

<template>
  <section class="py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-display font-bold text-center text-[var(--text-primary)] mb-12">
        Explore My Music
      </h2>

      <div class="grid md:grid-cols-2 gap-6 md:gap-8">
        <!-- Classical Portal -->
        <RouterLink
          to="/classical"
          class="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
          @mouseenter="hoveredSide = 'classical'"
          @mouseleave="hoveredSide = null"
        >
          <img
            src="/images/02-classical-golden-waves.jpg"
            alt="Classical Music"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 transition-all duration-500"
            :class="[
              hoveredSide === 'classical'
                ? 'bg-gradient-to-t from-[#1a2a3a]/90 via-[#c9a85c]/20 to-transparent'
                : 'bg-gradient-to-t from-[#1a2a3a]/80 to-transparent'
            ]"
          />
          <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div class="i-carbon-music text-5xl text-[#c9a85c] mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 class="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              Classical Works
            </h3>
            <p class="text-[#f8f4ef]/80 text-sm md:text-base max-w-xs">
              Concert music & chamber works
            </p>
            <span class="mt-4 px-4 py-2 border border-[#c9a85c] text-[#c9a85c] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Explore →
            </span>
          </div>
        </RouterLink>

        <!-- Gaming Portal -->
        <RouterLink
          to="/games"
          class="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
          @mouseenter="hoveredSide = 'gaming'"
          @mouseleave="hoveredSide = null"
        >
          <img
            src="/images/03-gaming-synthwave-grid.jpg"
            alt="Game Music"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 transition-all duration-500"
            :class="[
              hoveredSide === 'gaming'
                ? 'bg-gradient-to-t from-[#181820]/90 via-[#70d4d0]/20 to-transparent'
                : 'bg-gradient-to-t from-[#181820]/80 to-transparent'
            ]"
          />
          <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div class="i-carbon-game-console text-5xl text-[#70d4d0] mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 class="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              Game Music
            </h3>
            <p class="text-[#f0f0f5]/80 text-sm md:text-base max-w-xs">
              Soundtracks & music packs
            </p>
            <span class="mt-4 px-4 py-2 border border-[#70d4d0] text-[#70d4d0] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Explore →
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
