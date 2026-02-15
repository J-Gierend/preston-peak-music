<script setup lang="ts">
import { RouterLink } from 'vue-router'
import './HomePage.css'

const navCards = [
  {
    to: '/works',
    testId: 'nav-card-works',
    icon: 'i-carbon-music',
    title: 'Works',
    description: 'Concert music, chamber works & game soundtracks'
  },
  {
    to: '/about',
    testId: 'nav-card-about',
    icon: 'i-carbon-user-avatar',
    title: 'About',
    description: 'The composer behind the music'
  },
  {
    to: '/listen',
    testId: 'nav-card-listen',
    icon: 'i-carbon-headphones',
    title: 'Listen',
    description: 'Stream on your favorite platform'
  },
  {
    to: '/contact',
    testId: 'nav-card-contact',
    icon: 'i-carbon-send-alt',
    title: 'Contact',
    description: 'Commissions, collaborations & inquiries'
  }
]
</script>

<template>
  <div class="homepage">
    <!-- Hero -->
    <section class="homepage-hero">
      <h1 class="homepage-title">Preston Peak</h1>
      <p data-testid="hero-tagline" class="homepage-tagline">Composer</p>
    </section>

    <!-- Navigation Cards -->
    <section class="homepage-nav">
      <div class="nav-grid">
        <RouterLink
          v-for="card in navCards"
          :key="card.to"
          :to="card.to"
          :data-testid="card.testId"
          class="nav-card"
        >
          <div :class="['nav-card-icon', card.icon]" />
          <h2 class="nav-card-title">{{ card.title }}</h2>
          <p class="nav-card-desc">{{ card.description }}</p>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
