<script setup lang="ts">
import { computed } from 'vue'
import WizardStep from './WizardStep.vue'

interface FormData {
  name: string
  email: string
  message: string
}

const props = defineProps<{
  modelValue: FormData
}>()

const emit = defineEmits<{
  'update:modelValue': [value: FormData]
}>()

const form = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function updateField(field: keyof FormData, value: string) {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

const isEmailValid = computed(() => {
  const email = props.modelValue.email
  if (!email) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
})
</script>

<template>
  <WizardStep
    title="Tell me about your project"
    description="Share the details and I'll get back to you soon."
    :step-number="3"
    :total-steps="3"
  >
    <div class="space-y-4">
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Your Name *
        </label>
        <input
          id="name"
          type="text"
          :value="modelValue.name"
          @input="updateField('name', ($event.target as HTMLInputElement).value)"
          class="w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--bg-tertiary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          placeholder="John Doe"
          required
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          :value="modelValue.email"
          @input="updateField('email', ($event.target as HTMLInputElement).value)"
          class="w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
          :class="isEmailValid ? 'border-[var(--bg-tertiary)] focus:border-[var(--accent)]' : 'border-red-500'"
          placeholder="john@example.com"
          required
        />
        <p v-if="!isEmailValid" class="text-red-400 text-sm mt-1">
          Please enter a valid email address
        </p>
      </div>

      <!-- Message -->
      <div>
        <label for="message" class="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Project Details
        </label>
        <textarea
          id="message"
          :value="modelValue.message"
          @input="updateField('message', ($event.target as HTMLTextAreaElement).value)"
          rows="5"
          class="w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--bg-tertiary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
          placeholder="Tell me about your project, timeline, and any specific requirements..."
        />
      </div>
    </div>
  </WizardStep>
</template>
