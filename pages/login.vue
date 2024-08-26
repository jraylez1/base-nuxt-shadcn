<template>
  <div class="w-sceen h-screen flex justify-center items-center bg-gray-100">
    <Card>
      <CardHeader>
        <CardTitle class="flex justify-between items-center">
          <span>{{ $t('Login') }}</span>
          <LangSwitch />
        </CardTitle>
        <CardDescription>{{ $t('Log in to continue accessing your account.') }}</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="w-[400px] space-y-4">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>{{ $t('Username') }}</FormLabel>
              <FormControl>
                <Input type="text" :placeholder="$t('Username')" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>{{ $t('Password') }}</FormLabel>
              <FormControl>
                <Input type="password" :placeholder="$t('Password')" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full">{{ $t('Login') }}</Button>
        </form>
      </CardContent>
      <CardFooter class="flex justify-center items-center">
        {{ $t(`Don't have an account?`) }}
        <NuxtLink to="/register" class="ml-1 text-blue-600 hover:text-blue-800 hover:underline no-underline">{{
          $t('Sign up')
        }}</NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useAuthStore } from '~/store/auth'

definePageMeta({
  layout: 'login',
  middleware: 'auth'
})

const authStore = useAuthStore()
const { t } = useI18n()

const formSchema = toTypedSchema(
  z.object({
    username: z
      .string({
        required_error: t('Username is required'),
        invalid_type_error: 'Username must be a string'
      })
      .min(2)
      .max(50),
    password: z
      .string({
        required_error: t('Password is required'),
        invalid_type_error: 'Password must be a string'
      })
      .min(6, t('Password must be at least 6 characters long'))
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  authStore.login(values, t)
})
</script>

<style lang="scss" scoped></style>
