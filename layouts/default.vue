<template>
  <div v-if="isSessionChecked">
    <LayoutsHeaderDefault />
    <div class="flex mt-20 relative">
      <div class="fixed top-20 left-0 bottom-0 z-[49]">
        <LayoutsSlideDefault />
      </div>
      <div class="w-full p-8" :class="slideStore.showSlide ? 'ml-56' : 'ml-0 '" style="min-height: calc(100vh - 80px)">
        <div class="flex items-center">
          <NuxtLink to="/dashboard"><Home class="h-4 w-4 mr-1" /></NuxtLink>{{ ' / ' }}
          <NuxtLink :to="route.path" class="ml-1">{{ t(String(route.name)) }}</NuxtLink>
        </div>
        <div class="text-4xl font-bold my-4">{{ t(String(route.name)) }}</div>
        <NuxtPage />
      </div>
    </div>
    <Toaster position="top-right" richColors />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { useSlideStore } from '~/store/slide'

import { Toaster } from '@/components/ui/sonner'
import { Home } from 'lucide-vue-next'

const authStore = useAuthStore()
const slideStore = useSlideStore()

const isSessionChecked = ref(false)
const route = useRoute()
const { t } = useI18n()

onMounted(async () => {
  await authStore.checkSession()
  isSessionChecked.value = true
})
</script>

<style scoped></style>
