<script setup lang="ts">
import { ref, computed } from 'vue'
import ProjectTypeStep from './ProjectTypeStep.vue'
import ScopeStep from './ScopeStep.vue'
import DetailsStep from './DetailsStep.vue'

const currentStep = ref(1)
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submitError = ref<string | null>(null)

const projectType = ref('')
const scope = ref('')
const details = ref({
  name: '',
  email: '',
  message: ''
})

const canProceed = computed(() => {
  if (currentStep.value === 1) return !!projectType.value
  if (currentStep.value === 2) return !!scope.value
  if (currentStep.value === 3) {
    return details.value.name.trim() !== '' &&
           details.value.email.trim() !== '' &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.value.email)
  }
  return false
})

function nextStep() {
  if (currentStep.value < 3 && canProceed.value) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

async function submit() {
  if (!canProceed.value || isSubmitting.value) return

  isSubmitting.value = true
  submitError.value = null

  const formData = new FormData()
  formData.append('_subject', `Commission Inquiry: ${projectType.value}`)
  formData.append('project_type', projectType.value)
  formData.append('scope', scope.value)
  formData.append('name', details.value.name)
  formData.append('email', details.value.email)
  formData.append('message', details.value.message)

  try {
    // TODO: Replace with actual Formspree form ID
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    })

    if (response.ok) {
      isSubmitted.value = true
    } else {
      throw new Error('Failed to submit form')
    }
  } catch (err) {
    submitError.value = 'Failed to send. Please email directly or try again.'
  } finally {
    isSubmitting.value = false
  }
}

function reset() {
  currentStep.value = 1
  projectType.value = ''
  scope.value = ''
  details.value = { name: '', email: '', message: '' }
  isSubmitted.value = false
  submitError.value = null
}
</script>

<template>
  <div class="max-w-xl mx-auto">
    <!-- Success State -->
    <div v-if="isSubmitted" class="text-center py-12">
      <div class="i-carbon-checkmark-filled text-6xl text-[var(--accent)] mx-auto mb-4" />
      <h2 class="text-2xl font-display font-bold text-[var(--text-primary)] mb-2">
        Message Sent!
      </h2>
      <p class="text-[var(--text-secondary)] mb-6">
        Thank you for reaching out. I'll get back to you within 2-3 business days.
      </p>
      <button @click="reset" class="btn-outline">
        Send Another Inquiry
      </button>
    </div>

    <!-- Wizard Steps -->
    <template v-else>
      <ProjectTypeStep
        v-if="currentStep === 1"
        v-model="projectType"
      />
      <ScopeStep
        v-else-if="currentStep === 2"
        v-model="scope"
      />
      <DetailsStep
        v-else-if="currentStep === 3"
        v-model="details"
      />

      <!-- Error -->
      <p v-if="submitError" class="text-red-400 text-center mt-4">
        {{ submitError }}
      </p>

      <!-- Navigation -->
      <div class="flex items-center justify-between mt-8 pt-6 border-t border-[var(--bg-tertiary)]">
        <button
          v-if="currentStep > 1"
          @click="prevStep"
          class="btn-outline flex items-center gap-2"
        >
          <div class="i-carbon-arrow-left" />
          Back
        </button>
        <div v-else />

        <button
          v-if="currentStep < 3"
          @click="nextStep"
          :disabled="!canProceed"
          class="btn-primary flex items-center gap-2"
          :class="{ 'opacity-50 cursor-not-allowed': !canProceed }"
        >
          Continue
          <div class="i-carbon-arrow-right" />
        </button>
        <button
          v-else
          @click="submit"
          :disabled="!canProceed || isSubmitting"
          class="btn-primary flex items-center gap-2"
          :class="{ 'opacity-50 cursor-not-allowed': !canProceed || isSubmitting }"
        >
          <div v-if="isSubmitting" class="i-carbon-loading" />
          <template v-else>
            Send Inquiry
            <div class="i-carbon-send" />
          </template>
        </button>
      </div>
    </template>
  </div>
</template>
