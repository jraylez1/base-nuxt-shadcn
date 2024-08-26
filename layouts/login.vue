<template>
  <div v-if="isSessionChecked">
    <NuxtPage />
    <Toaster position="top-right" richColors />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { Toaster } from '@/components/ui/sonner'
const authStore = useAuthStore()
const isSessionChecked = ref(false)

onMounted(async () => {
  await authStore.checkSession()
  isSessionChecked.value = true
})
</script>

<style scoped></style>
