<script setup lang="ts">
import { SquarePen, Trash2 } from 'lucide-vue-next'
defineProps<{
  data: {
    id: string
  }
}>()
</script>

<template>
  <div class="flex justify-center items-center space-x-2">
    <Button><SquarePen class="h-4 w-4" /></Button>
    <Button variant="destructive"><Trash2 class="h-4 w-4" /></Button>
  </div>
</template>
