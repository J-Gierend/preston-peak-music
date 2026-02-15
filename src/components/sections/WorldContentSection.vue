<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useContentLoader } from '../../composables/useContentLoader'
import WorkCard from './WorkCard.vue'
import MusicPackCard from './MusicPackCard.vue'
import './WorldContentSection.css'

type World = 'classical' | 'gaming'

interface Work {
  slug: string
  title: string
  year: number
  duration: string
  instrumentation: string
  category: string
  awards: string[]
  description: string
  featured: boolean
  soundcloud: string
  bandcamp: string
  sheetMusicAvailable?: boolean
}

interface Category {
  slug: string
  name: string
  description: string
}

interface Pack {
  slug: string
  title: string
  tracks: number
  duration: string
  style: string[]
  price: string
  itchUrl: string
  preview: string
  description: string
  featured: boolean
}

const props = defineProps<{
  world: World
  selectedCategory?: string
}>()

const emit = defineEmits<{
  openWork: [slug: string]
  openPack: [slug: string]
  selectCategory: [slug: string | null]
}>()

const { loadContent } = useContentLoader()
const works = ref<Work[]>([])
const categories = ref<Category[]>([])
const packs = ref<Pack[]>([])
const isTransitioning = ref(false)
const activeCategory = ref<string | null>(null)

const showClassical = computed(() => props.world === 'classical')
const sectionTitle = computed(() =>
  showClassical.value ? 'Classical Works' : 'Game Music Packs'
)

const featuredWorks = computed(() => {
  return works.value.filter(w => w.featured)
})

const filteredWorks = computed(() => {
  if (!activeCategory.value) {
    // Show all works, sorted by featured first then year
    return [...works.value].sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return b.year - a.year
    })
  }
  return works.value.filter(w => w.category === activeCategory.value)
})

function getCategoryWorkCount(categorySlug: string): number {
  return works.value.filter(w => w.category === categorySlug).length
}

function selectCategory(slug: string | null) {
  activeCategory.value = slug
}

onMounted(async () => {
  const [worksData, packsData] = await Promise.all([
    loadContent<{ works: Work[], categories: Category[] }>('/data/works.json'),
    loadContent<{ packs: Pack[] }>('/data/packs.json')
  ])
  if (worksData) {
    works.value = worksData.works
    categories.value = worksData.categories || []
  }
  if (packsData) packs.value = packsData.packs
})

watch(() => props.world, () => {
  isTransitioning.value = true
  activeCategory.value = null
  setTimeout(() => {
    isTransitioning.value = false
  }, 300)
})
</script>

<template>
  <section
    data-testid="world-content-section"
    class="content-section"
    :class="{ transitioning: isTransitioning }"
  >
    <div class="section-container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="header-accent" />
        <h2 class="section-title">
          {{ sectionTitle }}
        </h2>
        <p class="section-subtitle">
          <template v-if="showClassical">
            Concert music and chamber works for the modern era
          </template>
          <template v-else>
            Royalty-free soundtracks for your games
          </template>
        </p>
      </div>

      <!-- Classical Content -->
      <template v-if="showClassical">
        <!-- Featured Works - Always visible -->
        <div v-if="featuredWorks.length > 0" class="featured-section">
          <h3 class="subsection-title">
            Featured Works
          </h3>
          <div class="featured-grid">
            <WorkCard
              v-for="work in featuredWorks"
              :key="work.slug"
              :work="work"
              class="featured-card"
              @click="emit('openWork', $event)"
            />
          </div>
        </div>

        <!-- Category Navigation -->
        <div v-if="categories.length > 0" class="category-nav">
          <h3 class="subsection-title">Browse by Category</h3>
          <div class="category-buttons">
            <button
              :class="['category-btn', { active: !activeCategory }]"
              @click="selectCategory(null)"
            >
              Show All
            </button>
            <button
              v-for="cat in categories"
              :key="cat.slug"
              :class="['category-btn', { active: activeCategory === cat.slug }]"
              @click="selectCategory(cat.slug)"
            >
              <span class="cat-name">{{ cat.name }}</span>
              <span class="cat-count">{{ getCategoryWorkCount(cat.slug) }}</span>
            </button>
          </div>
        </div>

        <!-- Works Grid -->
        <div class="works-section">
          <h3 class="subsection-title">
            {{ activeCategory ? categories.find(c => c.slug === activeCategory)?.name + ' Works' : 'All Works' }}
          </h3>
          <div
            data-testid="classical-works-grid"
            class="content-grid works-grid"
          >
            <WorkCard
              v-for="work in filteredWorks"
              :key="work.slug"
              :work="work"
              data-testid="work-card"
              @click="emit('openWork', $event)"
            />
          </div>
        </div>
      </template>

      <!-- Gaming Packs Grid -->
      <div
        v-else
        data-testid="gaming-packs-grid"
        class="content-grid packs-grid"
      >
        <MusicPackCard
          v-for="pack in packs"
          :key="pack.slug"
          :pack="pack"
          data-testid="pack-card"
          @click="emit('openPack', $event)"
        />
      </div>

      <!-- Empty State -->
      <div
        v-if="(showClassical && works.length === 0) || (!showClassical && packs.length === 0)"
        class="empty-state"
      >
        <p>No content available yet.</p>
      </div>
    </div>
  </section>
</template>
