<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from './composables/useTheme'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AdminErrorPanel from './components/common/AdminErrorPanel.vue'

const route = useRoute()
const { aesthetic, setAesthetic } = useTheme()

// Watch route changes to update aesthetic
watch(
  () => route.path,
  (path) => {
    if (path.startsWith('/games')) {
      setAesthetic('gaming')
    } else {
      setAesthetic('classical')
    }
  },
  { immediate: true }
)
</script>

<template>
  <div :data-aesthetic="aesthetic">
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
    <AdminErrorPanel />
  </div>
</template>
