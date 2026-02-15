<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMessage = ref('')

async function handleSubmit() {
  status.value = 'submitting'
  errorMessage.value = ''

  try {
    const res = await fetch('https://formspree.io/f/xpwzbvzk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, _subject: 'Newsletter signup' })
    })

    if (res.ok) {
      status.value = 'success'
      email.value = ''
    } else {
      status.value = 'error'
      errorMessage.value = 'Something went wrong. Please try again.'
    }
  } catch {
    status.value = 'error'
    errorMessage.value = 'Network error. Please try again.'
  }
}
</script>

<template>
  <div data-testid="newsletter-signup" class="newsletter-signup">
    <h4 class="newsletter-title">Stay Updated</h4>
    <p class="newsletter-desc">New releases, premieres & behind-the-scenes.</p>

    <form
      v-if="status !== 'success'"
      class="newsletter-form"
      @submit.prevent="handleSubmit"
    >
      <input
        v-model="email"
        data-testid="newsletter-email"
        type="email"
        required
        placeholder="your@email.com"
        class="newsletter-input"
        :disabled="status === 'submitting'"
      />
      <button
        data-testid="newsletter-submit"
        type="submit"
        class="newsletter-btn"
        :disabled="status === 'submitting'"
      >
        {{ status === 'submitting' ? '...' : 'Subscribe' }}
      </button>
    </form>

    <p v-if="status === 'success'" data-testid="newsletter-success" class="newsletter-success">
      You're subscribed. Welcome aboard.
    </p>
    <p v-if="status === 'error'" class="newsletter-error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.newsletter-signup {
  margin-top: 0.5rem;
}

.newsletter-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.newsletter-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.newsletter-form {
  display: flex;
  gap: 0;
}

.newsletter-input {
  flex: 1;
  padding: 0.625rem 0.75rem;
  background: var(--bg-tertiary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-right: none;
  color: var(--text-primary);
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.newsletter-input:focus {
  border-color: var(--accent);
}

.newsletter-input::placeholder {
  color: var(--text-muted);
}

.newsletter-btn {
  padding: 0.625rem 1.25rem;
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
  white-space: nowrap;
}

.newsletter-btn:hover {
  opacity: 0.9;
}

.newsletter-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.newsletter-success {
  font-size: 0.875rem;
  color: var(--accent);
  font-weight: 500;
}

.newsletter-error {
  font-size: 0.875rem;
  color: #ef4444;
  margin-top: 0.5rem;
}
</style>
