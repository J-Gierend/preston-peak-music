<script setup lang="ts">
import HeroSection from '../components/sections/HeroSection.vue'
import CommissionWizard from '../components/commission/CommissionWizard.vue'
</script>

<template>
  <div>
    <HeroSection
      title="Commission"
      subtitle="Let's create something special together"
      background-image="/images/07-contact-waveform-banner.jpg"
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
                <li class="flex items-start gap-3 text-[var(--text-secondary)]">
                  <div class="i-carbon-checkmark text-[var(--accent)] mt-1" />
                  <span>Original compositions tailored to your vision</span>
                </li>
                <li class="flex items-start gap-3 text-[var(--text-secondary)]">
                  <div class="i-carbon-checkmark text-[var(--accent)] mt-1" />
                  <span>High-quality audio files in your preferred format</span>
                </li>
                <li class="flex items-start gap-3 text-[var(--text-secondary)]">
                  <div class="i-carbon-checkmark text-[var(--accent)] mt-1" />
                  <span>Clear licensing terms for your project</span>
                </li>
                <li class="flex items-start gap-3 text-[var(--text-secondary)]">
                  <div class="i-carbon-checkmark text-[var(--accent)] mt-1" />
                  <span>Revisions until you're satisfied</span>
                </li>
              </ul>
            </div>

            <!-- Process -->
            <div class="card">
              <h3 class="text-lg font-display font-semibold text-[var(--text-primary)] mb-4">
                My Process
              </h3>
              <ol class="space-y-4">
                <li class="flex gap-3">
                  <span class="w-6 h-6 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center text-sm font-semibold flex-shrink-0">1</span>
                  <div>
                    <div class="font-medium text-[var(--text-primary)]">Discussion</div>
                    <div class="text-sm text-[var(--text-secondary)]">We'll talk about your vision and requirements</div>
                  </div>
                </li>
                <li class="flex gap-3">
                  <span class="w-6 h-6 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center text-sm font-semibold flex-shrink-0">2</span>
                  <div>
                    <div class="font-medium text-[var(--text-primary)]">Draft</div>
                    <div class="text-sm text-[var(--text-secondary)]">I create an initial sketch or demo</div>
                  </div>
                </li>
                <li class="flex gap-3">
                  <span class="w-6 h-6 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center text-sm font-semibold flex-shrink-0">3</span>
                  <div>
                    <div class="font-medium text-[var(--text-primary)]">Refinement</div>
                    <div class="text-sm text-[var(--text-secondary)]">We collaborate on revisions</div>
                  </div>
                </li>
                <li class="flex gap-3">
                  <span class="w-6 h-6 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center text-sm font-semibold flex-shrink-0">4</span>
                  <div>
                    <div class="font-medium text-[var(--text-primary)]">Delivery</div>
                    <div class="text-sm text-[var(--text-secondary)]">Final files delivered in your preferred format</div>
                  </div>
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
