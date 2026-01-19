<script setup lang="ts">
import { computed } from 'vue'

type World = 'classical' | 'gaming'

const props = defineProps<{
  modelValue: World
}>()

const emit = defineEmits<{
  'update:modelValue': [value: World]
  change: [value: World]
}>()

const isClassical = computed(() => props.modelValue === 'classical')

function selectWorld(world: World) {
  if (world !== props.modelValue) {
    emit('update:modelValue', world)
    emit('change', world)
  }
}
</script>

<template>
  <div
    data-testid="world-toggle"
    class="world-toggle"
  >
    <!-- Sliding background indicator -->
    <div
      class="toggle-indicator"
      :class="{ 'slide-right': !isClassical }"
    />

    <!-- Classical Tab -->
    <button
      data-testid="world-tab-classical"
      :data-active="isClassical"
      class="toggle-tab"
      :class="{ active: isClassical }"
      @click="selectWorld('classical')"
    >
      <span class="tab-icon">&#9834;</span>
      <span class="tab-label">Classical</span>
    </button>

    <!-- Divider -->
    <div class="toggle-divider" />

    <!-- Gaming Tab -->
    <button
      data-testid="world-tab-gaming"
      :data-active="!isClassical"
      class="toggle-tab"
      :class="{ active: !isClassical }"
      @click="selectWorld('gaming')"
    >
      <span class="tab-icon">&#127918;</span>
      <span class="tab-label">Game Music</span>
    </button>
  </div>
</template>

<style scoped>
.world-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  background: rgba(var(--bg-primary-rgb), 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  padding: 0.375rem;
  gap: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.toggle-indicator {
  position: absolute;
  left: 0.375rem;
  top: 0.375rem;
  width: calc(50% - 0.5rem);
  height: calc(100% - 0.75rem);
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
  border-radius: 9999px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.toggle-indicator.slide-right {
  transform: translateX(calc(100% + 0.25rem));
}

[data-aesthetic="gaming"] .toggle-indicator {
  background: linear-gradient(135deg, var(--accent), #60c4c0);
  box-shadow: 0 2px 16px rgba(112, 212, 208, 0.3);
}

.toggle-tab {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: transparent;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.toggle-tab .tab-label {
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.toggle-tab .tab-icon {
  font-size: 1.125rem;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.toggle-tab.active .tab-label {
  color: var(--bg-primary);
  font-weight: 600;
}

.toggle-tab.active .tab-icon {
  opacity: 1;
  transform: scale(1.1);
}

.toggle-tab:not(.active):hover .tab-label { color: var(--text-primary); }
.toggle-tab:not(.active):hover .tab-icon { opacity: 0.9; transform: scale(1.05); }

.toggle-divider {
  width: 1px;
  height: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
}

/* Gaming aesthetic overrides */
[data-aesthetic="gaming"] .toggle-tab {
  font-family: var(--font-body);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
}

[data-aesthetic="gaming"] .toggle-tab.active .tab-label {
  color: #181820;
  text-shadow: none;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .world-toggle {
    padding: 0.25rem;
  }

  .toggle-tab {
    padding: 0.625rem 1rem;
    font-size: 0.8125rem;
  }

  .tab-label {
    display: none;
  }

  .toggle-tab .tab-icon {
    font-size: 1.25rem;
  }

  .toggle-indicator {
    width: calc(50% - 0.375rem);
  }
}

@media (min-width: 481px) and (max-width: 640px) {
  .toggle-tab {
    padding: 0.625rem 1rem;
    font-size: 0.8125rem;
    gap: 0.375rem;
  }
}
</style>
