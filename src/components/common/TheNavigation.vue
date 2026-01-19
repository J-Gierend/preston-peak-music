<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'
import MobileMenu from './MobileMenu.vue'

const isMobileMenuOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/classical', label: 'Classical' },
  { to: '/games', label: 'Games' },
  { to: '/listen', label: 'Listen' },
  { to: '/news', label: 'News' },
  { to: '/contact', label: 'Contact' }
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--accent)]/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink
          to="/"
          class="text-xl font-display font-bold text-[var(--accent)] hover:opacity-80 transition-opacity"
        >
          Preston Peak
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            active-class="text-[var(--accent)]"
          >
            {{ link.label }}
          </RouterLink>
          <ThemeToggle />
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 text-[var(--text-primary)]"
          @click="isMobileMenuOpen = true"
          aria-label="Open menu"
        >
          <div class="i-carbon-menu text-xl" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <MobileMenu
      :is-open="isMobileMenuOpen"
      :links="navLinks"
      @close="isMobileMenuOpen = false"
    />
  </nav>
</template>
