<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useContentLoader } from '../../composables/useContentLoader'
import NewsletterSignup from './NewsletterSignup.vue'

interface Platform {
  name: string
  url: string
  icon: string
  color: string
}

interface PlatformsData {
  platforms: Platform[]
  email: string
  website: string
}

const { loadContent } = useContentLoader()
const platforms = ref<Platform[]>([])

onMounted(async () => {
  const data = await loadContent<PlatformsData>('/data/platforms.json')
  if (data) {
    platforms.value = data.platforms
  }
})

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-[var(--bg-secondary)] border-t border-[var(--accent)]/20 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div>
          <h3 class="text-xl font-display font-bold text-[var(--accent)] mb-4">
            Preston Peak
          </h3>
          <p class="text-[var(--text-secondary)] text-sm">
            Post-classical composer creating music that bridges concert halls and gaming worlds.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-[var(--text-primary)] mb-4">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <RouterLink to="/works" class="text-[var(--text-secondary)] hover:text-[var(--accent)]">
                Works
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/about" class="text-[var(--text-secondary)] hover:text-[var(--accent)]">
                About
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/contact" class="text-[var(--text-secondary)] hover:text-[var(--accent)]">
                Contact
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div>
          <h4 class="font-semibold text-[var(--text-primary)] mb-4">Connect</h4>
          <div class="flex gap-4">
            <a
              v-for="platform in platforms"
              :key="platform.name"
              :href="platform.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-2xl text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              :title="platform.name"
            >
              <div :class="platform.icon" />
            </a>
          </div>
        </div>

        <!-- Newsletter -->
        <div>
          <NewsletterSignup />
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-[var(--accent)]/10 text-center text-sm text-[var(--text-muted)]">
        © {{ currentYear }} Preston Peak. All rights reserved.
      </div>
    </div>
  </footer>
</template>
