<template>
  <div>
    <DataTable :data="data" :columns="columns" filter-field="email" />
  </div>
</template>

<script setup lang="ts">
import { columns } from './columns'

const data = ref<any>([
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com'
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  }
])
</script>

<style scoped></style>
