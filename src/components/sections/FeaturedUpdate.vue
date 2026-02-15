<script setup lang="ts">
import { computed } from 'vue'
import YouTubeEmbed from '../embeds/YouTubeEmbed.vue'

type World = 'classical' | 'gaming'

interface ClassicalUpdate {
  type: 'youtube'
  title: string
  subtitle: string
  description: string
  youtubeId: string
  badge?: string
}

interface GamingUpdate {
  type: 'steam' | 'youtube'
  title: string
  subtitle: string
  description: string
  steamUrl?: string
  youtubeId?: string
  image?: string
  badge?: string
}

type FeaturedUpdateData = ClassicalUpdate | GamingUpdate

const props = defineProps<{
  world: World
  classical?: ClassicalUpdate
  gaming?: GamingUpdate
}>()

const currentUpdate = computed<FeaturedUpdateData | undefined>(() => {
  return props.world === 'classical' ? props.classical : props.gaming
})

const isClassicalYouTube = computed(() => props.world === 'classical' && props.classical?.type === 'youtube')
const isGaming = computed(() => props.world === 'gaming' && props.gaming)
const hasGamingVideo = computed(() => props.gaming?.type === 'youtube' && props.gaming?.youtubeId)

// Steam header image - use local image to avoid CORS issues
const steamImage = computed(() => {
  if (props.gaming?.image) {
    const baseUrl = import.meta.env.BASE_URL
    return props.gaming.image.startsWith('/')
      ? `${baseUrl}${props.gaming.image.slice(1)}`
      : props.gaming.image
  }
  return ''
})
</script>

<template>
  <section v-if="currentUpdate" class="featured-update">
    <div class="featured-container">
      <header class="featured-header">
        <div class="header-left">
          <div class="featured-icon i-carbon-star-filled" />
          <span class="featured-label">Featured Project</span>
        </div>
        <span v-if="currentUpdate.badge" class="featured-badge">
          {{ currentUpdate.badge }}
        </span>
      </header>

      <!-- Classical: YouTube Embed -->
      <div v-if="isClassicalYouTube && classical" class="featured-content">
        <div class="featured-media">
          <YouTubeEmbed
            :video-id="classical.youtubeId"
            :title="classical.title"
          />
        </div>
        <div class="featured-info">
          <h3 class="featured-title">{{ classical.title }}</h3>
          <p class="featured-subtitle">{{ classical.subtitle }}</p>
          <p class="featured-description">{{ classical.description }}</p>
        </div>
      </div>

      <!-- Gaming: YouTube or Steam Image -->
      <div v-else-if="isGaming && gaming" class="featured-content">
        <div class="featured-media">
          <!-- If there's a YouTube trailer -->
          <YouTubeEmbed
            v-if="hasGamingVideo"
            :video-id="gaming.youtubeId!"
            :title="gaming.title"
          />
          <!-- Otherwise show Steam image with link overlay -->
          <a
            v-else
            :href="gaming.steamUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="steam-media-link"
          >
            <img
              :src="steamImage"
              :alt="gaming.title"
              class="steam-image"
            />
            <div class="steam-media-overlay">
              <div class="steam-play-hint">
                <div class="i-simple-icons-steam" />
                <span>View on Steam</span>
              </div>
            </div>
          </a>
        </div>
        <div class="featured-info">
          <h3 class="featured-title">{{ gaming.title }}</h3>
          <p class="featured-subtitle">{{ gaming.subtitle }}</p>
          <p class="featured-description">{{ gaming.description }}</p>
          <a
            v-if="gaming.steamUrl"
            :href="gaming.steamUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="steam-cta"
          >
            <div class="i-simple-icons-steam steam-icon" />
            <span>Wishlist on Steam</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-update {
  padding: 2.5rem 1rem;
  max-width: 900px;
  margin: 0 auto;
}

.featured-container {
  background: var(--bg-secondary);
  border-radius: 0;
  overflow: hidden;
  border: 2px solid var(--accent);
}

.featured-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.featured-icon {
  font-size: 1.25rem;
  color: var(--accent);
}

.featured-label {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
}


.featured-badge {
  padding: 0.375rem 1rem;
  border-radius: 0;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--accent);
  color: var(--bg-primary);
}

/* Unified content layout */
.featured-content {
  padding: 1.5rem;
}

.featured-media {
  margin-bottom: 1.25rem;
  border-radius: 0;
  overflow: hidden;
}

/* Steam media link (image with overlay) */
.steam-media-link {
  display: block;
  position: relative;
}

.steam-image {
  width: 100%;
  aspect-ratio: 460 / 215;
  object-fit: cover;
  display: block;
  transition: opacity 0.3s ease;
}

.steam-media-link:hover .steam-image {
  opacity: 0.9;
}

.steam-media-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.steam-media-link:hover .steam-media-overlay {
  opacity: 1;
}

.steam-play-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(27, 40, 56, 0.95);
  border-radius: 0;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  border: 1px solid rgba(102, 192, 244, 0.4);
}

.steam-play-hint .i-simple-icons-steam {
  font-size: 1.25rem;
  color: #66c0f4;
}

/* Info section */
.featured-info {
  display: flex;
  flex-direction: column;
}

.featured-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.2;
}


.featured-subtitle {
  font-size: 1rem;
  color: var(--accent);
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.featured-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

/* Steam CTA button */
.steam-cta {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 0.625rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #1b2838, #2a475e);
  border-radius: 0;
  color: white;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  border: 1px solid rgba(102, 192, 244, 0.3);
  transition: border-color 0.25s ease, background 0.25s ease;
}

.steam-cta:hover {
  border-color: #66c0f4;
  background: linear-gradient(135deg, #1e3a50, #2f5470);
}

.steam-icon {
  font-size: 1.25rem;
  color: #66c0f4;
}

/* Desktop: Side-by-side layout */
@media (min-width: 768px) {
  .featured-update {
    padding: 3rem 1.5rem;
  }

  .featured-content {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 2rem;
    padding: 2rem;
  }

  .featured-media {
    margin-bottom: 0;
  }

  .featured-info {
    justify-content: center;
  }

  .featured-title {
    font-size: 2rem;
  }


  .featured-description {
    margin-bottom: 1.5rem;
  }
}
</style>
