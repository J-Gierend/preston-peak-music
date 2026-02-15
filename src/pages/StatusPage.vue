<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

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
  sheetMusicAvailable?: boolean
  sheetMusicPrice?: string
  perusalScoreUrl?: string
  links?: {
    youtube?: string
    soundcloud?: string
    spotify?: string
    appleMusic?: string
    amazonMusic?: string
    pandora?: string
    bandcamp?: string
    youtubeMusic?: string
  }
}

interface PendingEdit {
  slug: string
  field: string
  value: string
}

const works = ref<Work[]>([])
const loading = ref(true)
const activeTab = ref<'changelog' | 'todo'>('todo')
const expandedItems = ref<Set<string>>(new Set())
const expandedCategories = ref<Set<string>>(new Set(['audio', 'description', 'perusal', 'duration']))
const editingWork = ref<string | null>(null)
const pendingEdits = ref<PendingEdit[]>([])
const showExportModal = ref(false)

// Load pending edits from localStorage
onMounted(async () => {
  try {
    const baseUrl = import.meta.env.BASE_URL
    const res = await fetch(`${baseUrl}data/works.json`)
    const data = await res.json()
    works.value = data.works

    // Load any saved edits
    const saved = localStorage.getItem('prestonPeakPendingEdits')
    if (saved) {
      pendingEdits.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load works:', e)
  } finally {
    loading.value = false
  }
})

// Save pending edits to localStorage
watch(pendingEdits, (edits) => {
  localStorage.setItem('prestonPeakPendingEdits', JSON.stringify(edits))
}, { deep: true })

function toggleExpand(id: string) {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id)
  } else {
    expandedItems.value.add(id)
  }
}

function toggleCategory(cat: string) {
  if (expandedCategories.value.has(cat)) {
    expandedCategories.value.delete(cat)
  } else {
    expandedCategories.value.add(cat)
  }
}

// Check helpers
function hasAudio(work: Work): boolean {
  return !!(work.links?.youtube || work.links?.soundcloud)
}

function getMissingCount(): { audio: number; description: number; perusal: number; duration: number; total: number } {
  const audio = works.value.filter(w => !hasAudio(w)).length
  const description = works.value.filter(w => !w.description || w.description.length < 10).length
  const perusal = works.value.filter(w => w.sheetMusicAvailable && !w.perusalScoreUrl).length
  const duration = works.value.filter(w => !w.duration).length
  return { audio, description, perusal, duration, total: audio + description + perusal + duration }
}

const missingCounts = computed(() => getMissingCount())

// Get pending edit value for a work/field
function getPendingValue(slug: string, field: string): string {
  const edit = pendingEdits.value.find(e => e.slug === slug && e.field === field)
  return edit?.value || ''
}

// Check if a field has a pending edit
function hasPendingEdit(slug: string, field: string): boolean {
  return pendingEdits.value.some(e => e.slug === slug && e.field === field)
}

// Save an edit
function saveEdit(slug: string, field: string, value: string) {
  const existing = pendingEdits.value.findIndex(e => e.slug === slug && e.field === field)
  if (value.trim()) {
    if (existing >= 0) {
      pendingEdits.value[existing].value = value
    } else {
      pendingEdits.value.push({ slug, field, value })
    }
  } else if (existing >= 0) {
    pendingEdits.value.splice(existing, 1)
  }
  editingWork.value = null
}

// Clear all edits
function clearAllEdits() {
  if (confirm('Are you sure you want to clear all your entered data?')) {
    pendingEdits.value = []
    localStorage.removeItem('prestonPeakPendingEdits')
  }
}

// Generate export data
const exportData = computed(() => {
  const grouped: Record<string, Record<string, string>> = {}
  for (const edit of pendingEdits.value) {
    if (!grouped[edit.slug]) {
      grouped[edit.slug] = {}
    }
    grouped[edit.slug][edit.field] = edit.value
  }
  return grouped
})

// Copy to clipboard
async function copyExport() {
  const text = JSON.stringify(exportData.value, null, 2)
  await navigator.clipboard.writeText(text)
  alert('Copied to clipboard! Send this to Josh.')
}

// Changelog data
const changelog = [
  {
    id: 'audio-priority',
    date: 'January 28, 2026',
    title: 'Smart Audio/Video Priority System',
    summary: 'Implemented intelligent media selection - YouTube videos are shown first when available, with SoundCloud as fallback.',
    details: [
      'YouTube embed takes priority when a work has a YouTube link',
      'SoundCloud embed only shown if no YouTube is available',
      'Prevents duplicate embeds (no more YouTube + SoundCloud showing together)',
      'Streaming links (Spotify, Apple Music, etc.) still shown separately for users who prefer those platforms'
    ],
    worksAffected: []
  },
  {
    id: 'perusal-scores',
    date: 'January 28, 2026',
    title: 'Perusal Score System Added',
    summary: 'Added "View Perusal Score" buttons linking to watermarked preview PDFs on Google Drive.',
    details: [
      'Each work with sheet music now shows a "View Perusal Score" button',
      'Links to watermarked Google Drive PDFs for preview before purchase',
      '"Purchase" button opens email to ppeakmusic@gmail.com with pre-filled subject',
      'Sheet music prices displayed prominently'
    ],
    worksAffected: []
  },
  {
    id: 'streaming-links',
    date: 'January 28, 2026',
    title: 'Comprehensive Streaming Links',
    summary: 'Added links to all major streaming platforms for each work.',
    details: [
      'Spotify, Apple Music, Amazon Music, Pandora links added',
      'Bandcamp links for direct purchases',
      'YouTube Music links where available',
      'Links open in new tabs with proper security attributes'
    ],
    worksAffected: []
  },
  {
    id: 'work-modal',
    date: 'January 28, 2026',
    title: 'Enhanced Work Detail Modal',
    summary: 'Redesigned the modal that appears when clicking on a work with more information and better layout.',
    details: [
      'YouTube video embed at the top (when available)',
      'Sheet Music section with perusal score + purchase options',
      'Stream section with all platform links',
      'Awards and recognition prominently displayed',
      'Full composer notes/description'
    ],
    worksAffected: []
  },
  {
    id: 'data-migration',
    date: 'January 28, 2026',
    title: 'Data Migration from Old Website',
    summary: 'Transferred all work data from the old Google Sites website to the new system.',
    details: [
      'Migrated YouTube performance video links',
      'Transferred composer notes and descriptions',
      'Added premiere information and awards',
      'Imported all perusal score Google Drive URLs',
      'Consolidated streaming platform links'
    ],
    worksAffected: []
  },
  {
    id: 'featured-project',
    date: 'January 2026',
    title: 'Featured Project Section',
    summary: 'Added a prominent "Featured Project" section on the homepage.',
    details: [
      'Classical mode: Shows Marriage Suite with YouTube video embed',
      'Gaming mode: Shows Trial By Magic with Steam wishlist link',
      'Auto-switches based on selected aesthetic mode',
      'Includes badge indicators (New Release, In Development)'
    ],
    worksAffected: []
  },
  {
    id: 'dual-aesthetic',
    date: 'January 2026',
    title: 'Dual Aesthetic System',
    summary: 'Implemented the classical/gaming world switcher.',
    details: [
      'Classical mode: Navy, gold, elegant serif fonts',
      'Gaming mode: Dark with cyan/magenta accents, pixel fonts',
      'Smooth transitions between modes',
      'Persists user preference'
    ],
    worksAffected: []
  }
]
</script>

<template>
  <div class="status-page">
    <header class="status-header">
      <div class="header-ornament">✦</div>
      <h1>Website Status</h1>
      <p class="subtitle">Recent changes and what still needs your attention</p>
      <p class="date">Last updated: January 28, 2026</p>
    </header>

    <!-- Tab Navigation -->
    <nav class="tab-nav">
      <button
        :class="['tab-btn', { active: activeTab === 'changelog' }]"
        @click="activeTab = 'changelog'"
      >
        <span class="tab-icon">✓</span>
        Recent Changes
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'todo' }]"
        @click="activeTab = 'todo'"
      >
        <span class="tab-icon">!</span>
        Needs Your Input
        <span v-if="missingCounts.total > 0" class="tab-badge">{{ missingCounts.total }}</span>
      </button>
    </nav>

    <div v-if="loading" class="loading">Loading works data...</div>

    <template v-else>
      <!-- CHANGELOG TAB -->
      <div v-show="activeTab === 'changelog'" class="tab-content">
        <section class="changelog-section">
          <h2><span class="section-icon">♪</span> What's Been Built</h2>
          <p class="section-intro">Click on any item to see details.</p>

          <div class="changelog-list">
            <article
              v-for="item in changelog"
              :key="item.id"
              :class="['changelog-item', { expanded: expandedItems.has(item.id) }]"
            >
              <button class="changelog-header" @click="toggleExpand(item.id)">
                <div class="changelog-main">
                  <span class="changelog-date">{{ item.date }}</span>
                  <h3 class="changelog-title">{{ item.title }}</h3>
                  <p class="changelog-summary">{{ item.summary }}</p>
                </div>
                <span class="expand-icon">{{ expandedItems.has(item.id) ? '−' : '+' }}</span>
              </button>

              <div v-if="expandedItems.has(item.id)" class="changelog-details">
                <div class="details-section">
                  <h4>What was done:</h4>
                  <ul>
                    <li v-for="detail in item.details" :key="detail">{{ detail }}</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>

      <!-- TODO/INPUT TAB -->
      <div v-show="activeTab === 'todo'" class="tab-content">
        <!-- Missing Summary -->
        <section class="missing-summary">
          <h2><span class="section-icon">!</span> Missing Information</h2>
          <p class="section-intro">Click on each category to expand and enter the missing data.</p>

          <div class="missing-stats">
            <button
              :class="['missing-stat', { active: expandedCategories.has('audio') }]"
              @click="toggleCategory('audio')"
            >
              <span class="stat-count">{{ missingCounts.audio }}</span>
              <span class="stat-label">Missing Audio/Video</span>
            </button>
            <button
              :class="['missing-stat', { active: expandedCategories.has('description') }]"
              @click="toggleCategory('description')"
            >
              <span class="stat-count">{{ missingCounts.description }}</span>
              <span class="stat-label">Missing Description</span>
            </button>
            <button
              :class="['missing-stat', { active: expandedCategories.has('perusal') }]"
              @click="toggleCategory('perusal')"
            >
              <span class="stat-count">{{ missingCounts.perusal }}</span>
              <span class="stat-label">Missing Perusal Score</span>
            </button>
            <button
              :class="['missing-stat', { active: expandedCategories.has('duration') }]"
              @click="toggleCategory('duration')"
            >
              <span class="stat-count">{{ missingCounts.duration }}</span>
              <span class="stat-label">Missing Duration</span>
            </button>
          </div>
        </section>

        <!-- Pending Edits Banner -->
        <div v-if="pendingEdits.length > 0" class="pending-banner">
          <div class="pending-info">
            <strong>{{ pendingEdits.length }} items entered</strong>
            <span>Your data is saved locally. When done, export and send to Josh.</span>
          </div>
          <div class="pending-actions">
            <button class="btn-export" @click="showExportModal = true">
              Export Data
            </button>
            <button class="btn-clear" @click="clearAllEdits">
              Clear All
            </button>
          </div>
        </div>

        <!-- Missing Audio/Video -->
        <section v-if="expandedCategories.has('audio')" class="input-section">
          <div class="section-header">
            <h3>Missing Audio/Video ({{ missingCounts.audio }})</h3>
            <p>Add a YouTube or SoundCloud link for these works.</p>
          </div>

          <div v-if="works.filter(w => !hasAudio(w)).length === 0" class="all-done">
            ✓ All works have audio!
          </div>

          <div v-else class="input-list">
            <div
              v-for="work in works.filter(w => !hasAudio(w))"
              :key="work.slug"
              class="input-card"
            >
              <div class="input-card-header">
                <div>
                  <strong>{{ work.title }}</strong>
                  <span class="work-meta">{{ work.instrumentation }} • {{ work.year }}</span>
                </div>
                <span v-if="hasPendingEdit(work.slug, 'youtube') || hasPendingEdit(work.slug, 'soundcloud')" class="saved-badge">Entered ✓</span>
              </div>

              <div class="input-fields">
                <div class="input-group">
                  <label>YouTube URL</label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    :value="getPendingValue(work.slug, 'youtube')"
                    @blur="(e) => saveEdit(work.slug, 'youtube', (e.target as HTMLInputElement).value)"
                  />
                </div>
                <div class="input-group">
                  <label>SoundCloud URL</label>
                  <input
                    type="url"
                    placeholder="https://soundcloud.com/..."
                    :value="getPendingValue(work.slug, 'soundcloud')"
                    @blur="(e) => saveEdit(work.slug, 'soundcloud', (e.target as HTMLInputElement).value)"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Missing Description -->
        <section v-if="expandedCategories.has('description')" class="input-section">
          <div class="section-header">
            <h3>Missing Description ({{ missingCounts.description }})</h3>
            <p>Add composer notes for these works.</p>
          </div>

          <div v-if="works.filter(w => !w.description || w.description.length < 10).length === 0" class="all-done">
            ✓ All works have descriptions!
          </div>

          <div v-else class="input-list">
            <div
              v-for="work in works.filter(w => !w.description || w.description.length < 10)"
              :key="work.slug"
              class="input-card"
            >
              <div class="input-card-header">
                <div>
                  <strong>{{ work.title }}</strong>
                  <span class="work-meta">{{ work.instrumentation }} • {{ work.year }}</span>
                </div>
                <span v-if="hasPendingEdit(work.slug, 'description')" class="saved-badge">Entered ✓</span>
              </div>

              <div class="input-fields">
                <div class="input-group full">
                  <label>Composer Notes / Description</label>
                  <textarea
                    rows="4"
                    placeholder="Describe the inspiration, story, or technical details of this work..."
                    :value="getPendingValue(work.slug, 'description')"
                    @blur="(e) => saveEdit(work.slug, 'description', (e.target as HTMLTextAreaElement).value)"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Missing Perusal Score -->
        <section v-if="expandedCategories.has('perusal')" class="input-section">
          <div class="section-header">
            <h3>Missing Perusal Score ({{ missingCounts.perusal }})</h3>
            <p>Upload the watermarked PDF to Google Drive, then paste the share link here.</p>
          </div>

          <div v-if="works.filter(w => w.sheetMusicAvailable && !w.perusalScoreUrl).length === 0" class="all-done">
            ✓ All sheet music has perusal scores!
          </div>

          <div v-else class="input-list">
            <div
              v-for="work in works.filter(w => w.sheetMusicAvailable && !w.perusalScoreUrl)"
              :key="work.slug"
              class="input-card"
            >
              <div class="input-card-header">
                <div>
                  <strong>{{ work.title }}</strong>
                  <span class="work-meta">{{ work.instrumentation }} • {{ work.year }}</span>
                </div>
                <span v-if="hasPendingEdit(work.slug, 'perusalScoreUrl')" class="saved-badge">Entered ✓</span>
              </div>

              <div class="input-fields">
                <div class="input-group full">
                  <label>Google Drive Perusal Score URL</label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/file/d/..."
                    :value="getPendingValue(work.slug, 'perusalScoreUrl')"
                    @blur="(e) => saveEdit(work.slug, 'perusalScoreUrl', (e.target as HTMLInputElement).value)"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Missing Duration -->
        <section v-if="expandedCategories.has('duration')" class="input-section">
          <div class="section-header">
            <h3>Missing Duration ({{ missingCounts.duration }})</h3>
            <p>Enter the approximate performance time.</p>
          </div>

          <div v-if="works.filter(w => !w.duration).length === 0" class="all-done">
            ✓ All works have duration!
          </div>

          <div v-else class="input-list">
            <div
              v-for="work in works.filter(w => !w.duration)"
              :key="work.slug"
              class="input-card compact"
            >
              <div class="input-card-header">
                <div>
                  <strong>{{ work.title }}</strong>
                  <span class="work-meta">{{ work.instrumentation }} • {{ work.year }}</span>
                </div>
                <span v-if="hasPendingEdit(work.slug, 'duration')" class="saved-badge">Entered ✓</span>
              </div>

              <div class="input-fields inline">
                <div class="input-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    placeholder="e.g., 5 min, 18-20 min"
                    :value="getPendingValue(work.slug, 'duration')"
                    @blur="(e) => saveEdit(work.slug, 'duration', (e.target as HTMLInputElement).value)"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </template>

    <!-- Export Modal -->
    <Teleport to="body">
      <div v-if="showExportModal" class="modal-backdrop" @click="showExportModal = false">
        <div class="export-modal" @click.stop>
          <h3>Export Your Data</h3>
          <p>Copy this and send it to Josh to update the website:</p>
          <pre class="export-content">{{ JSON.stringify(exportData, null, 2) }}</pre>
          <div class="modal-actions">
            <button class="btn-primary" @click="copyExport">Copy to Clipboard</button>
            <button class="btn-secondary" @click="showExportModal = false">Close</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.status-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  font-family: var(--font-body);
  color: var(--text-primary);
  min-height: 100vh;
}

.status-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--accent);
}

.header-ornament {
  font-size: 1.5rem;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.status-header h1 {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.date {
  color: var(--text-muted, var(--text-secondary));
  font-size: 0.875rem;
  margin-top: 0.5rem;
  opacity: 0.7;
}

/* Tab Navigation */
.tab-nav {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid rgba(212, 175, 55, 0.2);
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.tab-btn:hover {
  color: var(--text-primary);
}

.tab-btn.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.tab-badge {
  background: #dc2626;
  color: white;
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 0;
  font-family: var(--font-body);
}

.loading {
  text-align: center;
  padding: 4rem;
  color: var(--text-secondary);
  font-style: italic;
}

/* Section Headers */
section {
  margin-bottom: 2rem;
}

h2 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-icon {
  color: var(--accent);
  font-size: 1.25rem;
}

.section-intro {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

/* Missing Summary Stats */
.missing-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.missing-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
  background: var(--bg-secondary);
  border: 2px solid rgba(212, 175, 55, 0.2);
  border-radius: 0;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.missing-stat:hover {
  border-color: rgba(212, 175, 55, 0.4);
}

.missing-stat.active {
  border-color: var(--accent);
  background: var(--bg-secondary);
}

.stat-count {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-align: center;
}

/* Pending Banner */
.pending-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(74, 222, 128, 0.05));
  border: 1px solid rgba(74, 222, 128, 0.3);
  border-radius: 0;
  margin-bottom: 2rem;
}

.pending-info strong {
  color: #166534;
  display: block;
}

.pending-info span {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.pending-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-export {
  padding: 0.5rem 1rem;
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  border-radius: 0;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.btn-export:hover {
  opacity: 0.9;
}

.btn-clear {
  padding: 0.5rem 1rem;
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 0;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.btn-clear:hover {
  border-color: #dc2626;
  color: #dc2626;
}

/* Input Section */
.input-section {
  margin-bottom: 2rem;
}

.section-header {
  margin-bottom: 1rem;
}

.section-header h3 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.section-header p {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.all-done {
  padding: 2rem;
  text-align: center;
  color: #166534;
  font-weight: 500;
  background: rgba(74, 222, 128, 0.1);
  border-radius: 0;
}

.input-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-card {
  background: var(--bg-secondary);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 0;
  padding: 1.25rem;
}

.input-card.compact {
  padding: 1rem;
}

.input-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.input-card-header strong {
  color: var(--text-primary);
  display: block;
}

.work-meta {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.saved-badge {
  background: rgba(74, 222, 128, 0.15);
  color: #166534;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0;
  font-weight: 600;
}

.input-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-fields.inline {
  flex-direction: row;
  align-items: flex-end;
}

.input-group {
  flex: 1;
}

.input-group.full {
  width: 100%;
}

.input-group label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-primary);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 0;
  font-family: inherit;
  font-size: 0.9rem;
  color: var(--text-primary);
  transition: border-color 0.2s;
}

.input-group input:focus,
.input-group textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.input-group input::placeholder,
.input-group textarea::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}

.input-group textarea {
  resize: vertical;
  min-height: 100px;
}

/* Changelog */
.changelog-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.changelog-item {
  background: var(--bg-secondary);
  border-radius: 0;
  border: 1px solid rgba(212, 175, 55, 0.2);
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.changelog-item:hover {
  border-color: rgba(212, 175, 55, 0.4);
}

.changelog-item.expanded {
  border-color: var(--accent);
}

.changelog-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.25rem 1.5rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  gap: 1rem;
}

.changelog-main {
  flex: 1;
}

.changelog-date {
  font-size: 0.75rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.changelog-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0.25rem 0 0.5rem;
}

.changelog-summary {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.expand-icon {
  font-size: 1.5rem;
  color: var(--accent);
  font-weight: 300;
  line-height: 1;
}

.changelog-details {
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid rgba(212, 175, 55, 0.1);
  padding-top: 1.25rem;
}

.details-section h4 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent);
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.details-section ul {
  margin: 0;
  padding-left: 1.25rem;
}

.details-section li {
  margin-bottom: 0.35rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Export Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

.export-modal {
  background: var(--bg-secondary);
  border-radius: 0;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow: auto;
}

.export-modal h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.export-modal p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.export-content {
  background: var(--bg-primary);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 0;
  padding: 1rem;
  font-size: 0.8rem;
  overflow: auto;
  max-height: 300px;
  white-space: pre-wrap;
  color: var(--text-primary);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-primary {
  flex: 1;
  padding: 0.75rem 1.5rem;
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  border-radius: 0;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 0;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Responsive */
@media (max-width: 768px) {
  .status-page {
    padding: 2rem 1rem;
  }

  .status-header h1 {
    font-size: 1.75rem;
  }

  .tab-btn {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .missing-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-count {
    font-size: 2rem;
  }

  .pending-banner {
    flex-direction: column;
    text-align: center;
  }

  .input-fields.inline {
    flex-direction: column;
  }
}
</style>
