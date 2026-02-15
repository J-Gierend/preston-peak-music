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
  emit('update:modelValue', world)
  emit('change', world)
}
</script>

<template>
  <div class="nav-world-toggle" data-testid="nav-world-toggle">
    <button
      :class="['toggle-btn', { active: isClassical }]"
      @click="selectWorld('classical')"
      title="Classical Works"
    >
      <span class="toggle-icon i-carbon-music" />
      <span class="toggle-label">Classical</span>
    </button>
    <button
      :class="['toggle-btn gaming', { active: !isClassical }]"
      @click="selectWorld('gaming')"
      title="Game Music"
    >
      <span class="toggle-icon i-carbon-game-console" />
      <span class="toggle-label">Gaming</span>
    </button>
  </div>
</template>

<style scoped>
.nav-world-toggle {
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background: var(--bg-secondary);
  border-radius: 0.5rem;
  border: 1px solid var(--accent)/20;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border: none;
  background: transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 500;
}

.toggle-btn:hover {
  color: var(--text-primary);
}

.toggle-btn.active {
  background: var(--accent);
  color: var(--bg-primary);
}

.toggle-btn.gaming.active {
  background: #70d4d0;
  color: #181820;
}

.toggle-icon {
  font-size: 0.875rem;
}


/* Hide label on small screens */
@media (max-width: 768px) {
  .toggle-label {
    display: none;
  }

  .toggle-btn {
    padding: 0.375rem 0.5rem;
  }
}
</style>
