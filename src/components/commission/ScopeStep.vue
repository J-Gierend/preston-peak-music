<script setup lang="ts">
import WizardStep from './WizardStep.vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const scopes = [
  {
    id: 'small',
    title: 'Small',
    description: '1-3 minutes, single piece or short cue'
  },
  {
    id: 'medium',
    title: 'Medium',
    description: '5-10 minutes, multiple cues or movements'
  },
  {
    id: 'large',
    title: 'Large',
    description: '15+ minutes, full soundtrack or suite'
  },
  {
    id: 'unsure',
    title: 'Not sure yet',
    description: "Let's discuss the scope together"
  }
]

function select(id: string) {
  emit('update:modelValue', id)
}
</script>

<template>
  <WizardStep
    title="Project scope?"
    description="Roughly how much music do you need?"
    :step-number="2"
    :total-steps="3"
  >
    <div class="space-y-3">
      <button
        v-for="scope in scopes"
        :key="scope.id"
        @click="select(scope.id)"
        class="w-full p-4 rounded-xl border-2 text-left transition-all hover:border-[var(--accent)] flex items-center gap-4"
        :class="modelValue === scope.id
          ? 'border-[var(--accent)] bg-[var(--accent)]/10'
          : 'border-[var(--bg-tertiary)] bg-[var(--bg-secondary)]'"
      >
        <div
          class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
          :class="modelValue === scope.id
            ? 'border-[var(--accent)] bg-[var(--accent)]'
            : 'border-[var(--text-muted)]'"
        >
          <div v-if="modelValue === scope.id" class="w-2 h-2 rounded-full bg-[var(--bg-primary)]" />
        </div>
        <div>
          <h3 class="font-semibold text-[var(--text-primary)]">
            {{ scope.title }}
          </h3>
          <p class="text-sm text-[var(--text-secondary)]">
            {{ scope.description }}
          </p>
        </div>
      </button>
    </div>
  </WizardStep>
</template>
