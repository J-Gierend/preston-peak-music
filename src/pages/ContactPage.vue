<script setup lang="ts">
import HeroSection from '../components/sections/HeroSection.vue'
import CommissionWizard from '../components/commission/CommissionWizard.vue'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <div>
    <HeroSection
      title="Commission"
      subtitle="Let's create something special together"
      :background-image="`${baseUrl}images/backgrounds/hero-contact.jpg`"
    />

    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="grid lg:grid-cols-5 gap-12">
          <!-- Wizard -->
          <div class="lg:col-span-3">
            <CommissionWizard />
          </div>

          <!-- Info Sidebar -->
          <div class="lg:col-span-2 space-y-8">
            <!-- What I Offer -->
            <div class="card">
              <h3 class="text-lg font-display font-semibold text-[var(--text-primary)] mb-4">
                What I Offer
              </h3>
              <ul class="space-y-3">
                <li class="pl-4 border-l-2 border-[var(--accent)] text-[var(--text-secondary)]">
                  Original compositions tailored to your vision
                </li>
                <li class="pl-4 border-l-2 border-[var(--accent)] text-[var(--text-secondary)]">
                  High-quality audio files in your preferred format
                </li>
                <li class="pl-4 border-l-2 border-[var(--accent)] text-[var(--text-secondary)]">
                  Clear licensing terms for your project
                </li>
                <li class="pl-4 border-l-2 border-[var(--accent)] text-[var(--text-secondary)]">
                  Revisions until you're satisfied
                </li>
              </ul>
            </div>

            <!-- Process -->
            <div class="card">
              <h3 class="text-lg font-display font-semibold text-[var(--text-primary)] mb-4">
                My Process
              </h3>
              <ol class="space-y-4">
                <li class="pl-4 border-l-2 border-[var(--accent)]">
                  <div class="font-medium text-[var(--text-primary)]">Discussion</div>
                  <div class="text-sm text-[var(--text-secondary)]">We'll talk about your vision and requirements</div>
                </li>
                <li class="pl-4 border-l-2 border-[var(--accent)]">
                  <div class="font-medium text-[var(--text-primary)]">Draft</div>
                  <div class="text-sm text-[var(--text-secondary)]">I create an initial sketch or demo</div>
                </li>
                <li class="pl-4 border-l-2 border-[var(--accent)]">
                  <div class="font-medium text-[var(--text-primary)]">Refinement</div>
                  <div class="text-sm text-[var(--text-secondary)]">We collaborate on revisions</div>
                </li>
                <li class="pl-4 border-l-2 border-[var(--accent)]">
                  <div class="font-medium text-[var(--text-primary)]">Delivery</div>
                  <div class="text-sm text-[var(--text-secondary)]">Final files delivered in your preferred format</div>
                </li>
              </ol>
            </div>

            <!-- Contact Info -->
            <div class="card">
              <h3 class="text-lg font-display font-semibold text-[var(--text-primary)] mb-4">
                Prefer Email?
              </h3>
              <p class="text-[var(--text-secondary)] mb-4">
                You can also reach me directly:
              </p>
              <a
                href="mailto:contact@prestonpeakmusic.com"
                class="inline-flex items-center gap-2 text-[var(--accent)] hover:opacity-80"
              >
                <div class="i-carbon-email" />
                contact@prestonpeakmusic.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
