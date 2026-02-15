<script setup lang="ts">
import WizardStep from './WizardStep.vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const projectTypes = [
  {
    id: 'classical',
    title: 'Classical / Concert',
    description: 'Chamber music, solo works, orchestral pieces',
    icon: 'i-carbon-music'
  },
  {
    id: 'game',
    title: 'Video Game',
    description: 'Soundtracks, ambient, action themes',
    icon: 'i-carbon-game-console'
  },
  {
    id: 'film',
    title: 'Film / Media',
    description: 'Scores for film, ads, or other media',
    icon: 'i-carbon-video'
  },
  {
    id: 'other',
    title: 'Other',
    description: 'Something else entirely',
    icon: 'i-carbon-star'
  }
]

function select(id: string) {
  emit('update:modelValue', id)
}
</script>

<template>
  <WizardStep
    title="What type of project?"
    description="Select the category that best fits your needs."
    :step-number="1"
    :total-steps="3"
  >
    <div class="grid sm:grid-cols-2 gap-4">
      <button
        v-for="type in projectTypes"
        :key="type.id"
        @click="select(type.id)"
        class="p-6 border-2 text-left transition-colors hover:border-[var(--accent)] group"
        :class="modelValue === type.id
          ? 'border-[var(--accent)] bg-[var(--accent)]/10'
          : 'border-[var(--bg-tertiary)] bg-[var(--bg-secondary)]'"
      >
        <div
          :class="type.icon"
          class="text-3xl mb-3 transition-colors"
          :style="{ color: modelValue === type.id ? 'var(--accent)' : 'var(--text-secondary)' }"
        />
        <h3 class="font-semibold text-[var(--text-primary)] mb-1">
          {{ type.title }}
        </h3>
        <p class="text-sm text-[var(--text-secondary)]">
          {{ type.description }}
        </p>
      </button>
    </div>
  </WizardStep>
</template>
