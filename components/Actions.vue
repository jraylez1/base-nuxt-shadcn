<script setup lang="ts">
import { SquarePen, Trash2 } from 'lucide-vue-next'
import { useReportStore } from '~/store/report'

defineProps<{
  data: {
    id: string
    email: string
  }
}>()

const reportStore = useReportStore()
</script>

<template>
  <div class="flex justify-center items-center space-x-2">
    <Button @click="reportStore.openModal(data)"><SquarePen class="h-4 w-4" /></Button>
    <Button variant="destructive"><Trash2 class="h-4 w-4" /></Button>
  </div>
</template>
