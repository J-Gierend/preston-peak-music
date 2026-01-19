<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useContentLoader } from '../composables/useContentLoader'
import HeroSection from '../components/sections/HeroSection.vue'

interface Bio {
  name: string
  tagline: string
  shortBio: string
  fullBio: string[]
  highlights: string[]
  image: string
}

const { loadContent } = useContentLoader()
const bio = ref<Bio | null>(null)

onMounted(async () => {
  const data = await loadContent<Bio>('/data/bio.json')
  if (data) bio.value = data
})
</script>

<template>
  <div>
    <HeroSection
      title="About"
      subtitle="The story behind the music"
      background-image="/images/06-about-portrait-backdrop.jpg"
    />

    <section v-if="bio" class="py-20 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-3 gap-12">
          <!-- Main Bio -->
          <div class="md:col-span-2 space-y-6">
            <h2 class="text-3xl font-display font-bold text-[var(--text-primary)]">
              {{ bio.name }}
            </h2>
            <p class="text-xl text-[var(--accent)]">
              {{ bio.tagline }}
            </p>
            <div class="space-y-4">
              <p
                v-for="(paragraph, index) in bio.fullBio"
                :key="index"
                class="text-[var(--text-secondary)] leading-relaxed"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>

          <!-- Highlights -->
          <div class="space-y-6">
            <h3 class="text-xl font-display font-semibold text-[var(--text-primary)]">
              Highlights
            </h3>
            <ul class="space-y-4">
              <li
                v-for="highlight in bio.highlights"
                :key="highlight"
                class="flex items-start gap-3"
              >
                <div class="i-carbon-star-filled text-[var(--accent)] mt-1 flex-shrink-0" />
                <span class="text-[var(--text-secondary)]">{{ highlight }}</span>
              </li>
            </ul>

            <!-- Quick Links -->
            <div class="pt-6 border-t border-[var(--bg-tertiary)]">
              <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-4">
                Quick Links
              </h3>
              <div class="space-y-2">
                <RouterLink
                  to="/classical"
                  class="flex items-center gap-2 text-[var(--accent)] hover:opacity-80"
                >
                  <div class="i-carbon-music" />
                  Classical Works
                </RouterLink>
                <RouterLink
                  to="/games"
                  class="flex items-center gap-2 text-[var(--accent)] hover:opacity-80"
                >
                  <div class="i-carbon-game-console" />
                  Game Music
                </RouterLink>
                <RouterLink
                  to="/contact"
                  class="flex items-center gap-2 text-[var(--accent)] hover:opacity-80"
                >
                  <div class="i-carbon-email" />
                  Commission
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
