<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useContentLoader } from '../composables/useContentLoader'
import HeroSection from '../components/sections/HeroSection.vue'
import SoundCloudEmbed from '../components/embeds/SoundCloudEmbed.vue'
import YouTubeEmbed from '../components/embeds/YouTubeEmbed.vue'

const baseUrl = import.meta.env.BASE_URL

interface Platform {
  name: string
  url: string
  icon: string
  color: string
}

interface PlatformsData {
  platforms: Platform[]
}

const { loadContent } = useContentLoader()
const platforms = ref<Platform[]>([])

onMounted(async () => {
  const data = await loadContent<PlatformsData>('/data/platforms.json')
  if (data) platforms.value = data.platforms
})
</script>

<template>
  <div>
    <HeroSection
      title="Listen"
      subtitle="Stream and discover my music"
      :background-image="`${baseUrl}images/backgrounds/hero-listen.jpg`"
    />

    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto space-y-16">
        <!-- Platforms -->
        <div>
          <h2 class="text-2xl font-display font-bold text-[var(--text-primary)] mb-8 text-center">
            Find Me On
          </h2>
          <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <a
              v-for="platform in platforms"
              :key="platform.name"
              :href="platform.url"
              target="_blank"
              rel="noopener noreferrer"
              class="card card-hover flex flex-col items-center gap-3 py-6 hover:border-[var(--accent)] border border-transparent transition-colors"
            >
              <div :class="platform.icon" class="text-4xl" :style="{ color: platform.color }" />
              <span class="text-[var(--text-primary)] font-medium">{{ platform.name }}</span>
            </a>
          </div>
        </div>

        <!-- Featured Embed -->
        <div>
          <h2 class="text-2xl font-display font-bold text-[var(--text-primary)] mb-8 text-center">
            Featured Track
          </h2>
          <SoundCloudEmbed
            url="https://soundcloud.com/preston-peak-104023590"
            title="Latest Release"
          />
        </div>

        <!-- Bandcamp CTA -->
        <div class="bg-[var(--bg-secondary)] p-8 text-center">
          <div class="i-simple-icons-bandcamp text-5xl text-[#1da0c3] mx-auto mb-4" />
          <h3 class="text-xl font-display font-bold text-[var(--text-primary)] mb-2">
            Support on Bandcamp
          </h3>
          <p class="text-[var(--text-secondary)] mb-6">
            Purchase high-quality downloads and support independent music.
          </p>
          <a
            href="https://prestonpeak.bandcamp.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary inline-flex items-center gap-2"
          >
            <div class="i-simple-icons-bandcamp" />
            Visit Bandcamp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
