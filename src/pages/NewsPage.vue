<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useContentLoader } from '../composables/useContentLoader'
import HeroSection from '../components/sections/HeroSection.vue'

const baseUrl = import.meta.env.BASE_URL

interface Post {
  id: string
  date: string
  title: string
  content: string
  type: 'release' | 'award' | 'update' | 'event'
  link: string | null
}

const { loadContent } = useContentLoader()
const posts = ref<Post[]>([])

onMounted(async () => {
  const data = await loadContent<{ posts: Post[] }>('/data/news.json')
  if (data) {
    posts.value = data.posts.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }
})

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getTypeLabel(type: string): string {
  switch (type) {
    case 'release': return 'Release'
    case 'award': return 'Award'
    case 'event': return 'Event'
    default: return 'Update'
  }
}
</script>

<template>
  <div>
    <HeroSection
      title="News"
      subtitle="Updates, releases, and announcements"
      :background-image="`${baseUrl}images/backgrounds/hero-news.jpg`"
    />

    <section class="py-20 px-4">
      <div class="max-w-3xl mx-auto">
        <div v-if="posts.length === 0" class="text-center py-12 text-[var(--text-secondary)]">
          No news yet. Check back soon!
        </div>

        <div class="space-y-8">
          <article
            v-for="post in posts"
            :key="post.id"
            class="card"
          >
            <div class="flex items-start justify-between gap-4 mb-2">
              <h2 class="text-xl font-display font-semibold text-[var(--text-primary)]">
                {{ post.title }}
              </h2>
              <span class="text-xs font-medium text-[var(--accent)] uppercase tracking-wider whitespace-nowrap">
                {{ getTypeLabel(post.type) }}
              </span>
            </div>
            <time class="text-sm text-[var(--text-muted)] block mb-3">
              {{ formatDate(post.date) }}
            </time>
            <p class="text-[var(--text-secondary)] mb-4">
              {{ post.content }}
            </p>
            <a
              v-if="post.link"
              :href="post.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-[var(--accent)] hover:opacity-80 text-sm"
            >
              Learn more
              <div class="i-carbon-arrow-right" />
            </a>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
