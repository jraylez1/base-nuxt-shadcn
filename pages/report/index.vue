<template>
  <div>
    <DataTable :data="data" :columns="columns" filter-field="email" @openModal="reportStore.openModal" />
    <Sheet :open="reportStore.showModal" @update:open="reportStore.onModalUpdate">
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{{
            reportStore.data ? t(`Edit ${String(route.name)}`) : t(`Add new ${String(route.name)}`)
          }}</SheetTitle>
          <SheetDescription>
            {{ reportStore.data ? t(`Edit ${String(route.name)} here.`) : t(`Add new ${String(route.name)} here.`) }}
          </SheetDescription>
        </SheetHeader>
        <div class="my-4">
          <form @submit="onSubmit" class="w-full space-y-4">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <SheetFooter>
              <Button type="submit" class="w-1/4">{{ reportStore.data ? t('Save') : t('Add new') }}</Button>
              <Button variant="destructive" @click="reportStore.closeModal" class="w-1/4">Cancel</Button>
            </SheetFooter>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
import { columns } from './columns'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useReportStore } from '~/store/report'
import * as z from 'zod'

const { t } = useI18n()
const route = useRoute()
const reportStore = useReportStore()

const initialValues = {
  email: ''
}

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({
        required_error: t('Email is required'),
        invalid_type_error: 'Email must be a string'
      })
      .email(t('Invalid email address'))
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues
})

watch(
  () => reportStore.data,
  (newData: any) => {
    if (newData) {
      form.setValues({ ...initialValues, ...newData })
    } else {
      form.setValues(initialValues)
    }
  }
)

const onSubmit = form.handleSubmit((values) => {
  if (reportStore.data) {
    console.log('Edit:', { ...values, id: reportStore.data.id })
  } else {
    console.log('Add:', values)
  }
})

const data = ref<any>([
  {
    id: '1',
    amount: 100,
    status: 'pending',
    email: 'm@example.com'
  },
  {
    id: '2',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '3',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '4',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '5',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '6',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '7',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '8',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '9',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '10',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  },
  {
    id: '11',
    amount: 100,
    status: 'pending',
    email: 'a@example.com'
  }
])
</script>

<style scoped></style>
