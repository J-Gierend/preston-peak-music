<script setup lang="ts">
import { computed, ref } from 'vue'

type World = 'classical' | 'gaming'

const props = defineProps<{
  modelValue: World
}>()

const emit = defineEmits<{
  'update:modelValue': [value: World]
  change: [value: World]
}>()

const hoveredSide = ref<World | null>(null)
const isClassical = computed(() => props.modelValue === 'classical')

function selectWorld(world: World) {
  emit('update:modelValue', world)
  emit('change', world)
}
</script>

<template>
  <div data-testid="world-toggle" class="world-toggle-cards">
    <!-- Classical Card -->
    <button
      data-testid="world-tab-classical"
      :data-active="isClassical"
      class="world-card group"
      :class="{ active: isClassical }"
      @mouseenter="hoveredSide = 'classical'"
      @mouseleave="hoveredSide = null"
      @click="selectWorld('classical')"
    >
      <img
        src="/images/02-classical-golden-waves.jpg"
        alt="Classical Music"
        class="card-image"
      />
      <div
        class="card-overlay"
        :class="{ hovered: hoveredSide === 'classical' }"
      />
      <div class="card-content">
        <div class="i-carbon-music card-icon classical-icon" />
        <h3 class="card-title">Classical Works</h3>
        <p class="card-subtitle">Concert music & chamber works</p>
        <span v-if="isClassical" class="card-badge">Selected</span>
      </div>
    </button>

    <!-- Gaming Card -->
    <button
      data-testid="world-tab-gaming"
      :data-active="!isClassical"
      class="world-card group"
      :class="{ active: !isClassical }"
      @mouseenter="hoveredSide = 'gaming'"
      @mouseleave="hoveredSide = null"
      @click="selectWorld('gaming')"
    >
      <img
        src="/images/03-gaming-synthwave-grid.jpg"
        alt="Game Music"
        class="card-image"
      />
      <div
        class="card-overlay gaming"
        :class="{ hovered: hoveredSide === 'gaming' }"
      />
      <div class="card-content">
        <div class="i-carbon-game-console card-icon gaming-icon" />
        <h3 class="card-title">Game Music</h3>
        <p class="card-subtitle">Soundtracks & music packs</p>
        <span v-if="!isClassical" class="card-badge gaming">Selected</span>
      </div>
    </button>
  </div>
</template>

<style scoped>
.world-toggle-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.world-card {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 0;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
  background: none;
  padding: 0;
}

.world-card.active {
  border-color: var(--accent);
}

.world-card.active[data-testid="world-tab-gaming"] {
  border-color: var(--gaming-accent);
}

.card-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.world-card:hover .card-image {
  opacity: 0.9;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(26, 42, 58, 0.9) 0%,
    rgba(26, 42, 58, 0.4) 50%,
    transparent 100%
  );
  transition: background 0.5s ease;
}

.card-overlay.hovered {
  background: linear-gradient(
    to top,
    rgba(26, 42, 58, 0.95) 0%,
    rgba(201, 168, 92, 0.2) 50%,
    transparent 100%
  );
}

.card-overlay.gaming {
  background: linear-gradient(
    to top,
    rgba(24, 24, 32, 0.9) 0%,
    rgba(24, 24, 32, 0.4) 50%,
    transparent 100%
  );
}

.card-overlay.gaming.hovered {
  background: linear-gradient(
    to top,
    rgba(24, 24, 32, 0.95) 0%,
    rgba(112, 212, 208, 0.2) 50%,
    transparent 100%
  );
}

.card-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  text-align: center;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.classical-icon {
  color: var(--classical-accent);
}

.gaming-icon {
  color: var(--gaming-accent);
}

.world-card:hover .card-icon {
  color: var(--text-primary);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.2;
}


.card-subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.card-badge {
  padding: 0.375rem 1rem;
  border-radius: 0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--classical-accent);
  color: var(--classical-bg);
}

.card-badge.gaming {
  background: var(--gaming-accent);
  color: var(--gaming-bg);
}

/* Responsive */
@media (max-width: 640px) {
  .world-toggle-cards {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .world-card {
    aspect-ratio: 16 / 9;
  }

  .card-icon {
    font-size: 2.5rem;
  }

  .card-title {
    font-size: 1.1rem;
  }

}
</style>
