<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AdminErrorPanel from './components/common/AdminErrorPanel.vue'

// Initialize theme from localStorage on app mount
const { aesthetic } = useTheme()

onMounted(() => {
  // Theme is auto-applied by useTheme composable
})
</script>

<template>
  <div :data-aesthetic="aesthetic">
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
    <AdminErrorPanel />
  </div>
</template>
