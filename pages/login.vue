<template>
  <div class="w-sceen h-screen flex justify-center items-center bg-gray-100">
    <Card>
      <CardHeader>
        <CardTitle class="flex justify-between items-center">
          <span>{{ t('Login') }}</span>
          <LangSwitch />
        </CardTitle>
        <CardDescription>{{ t('Log in to continue accessing your account.') }}</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="w-[400px] space-y-4">
          <FormField v-slot="{ componentField }" name="mobile">
            <FormItem>
              <FormLabel>{{ t('Mobile') }}</FormLabel>
              <FormControl>
                <Input type="text" :placeholder="t('Mobile')" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>{{ t('Password') }}</FormLabel>
              <FormControl>
                <Input type="password" :placeholder="t('Password')" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex justify-start items-center mb-6">
            <div class="flex items-center">
              <Checkbox :checked="rememberMe" @update:checked="(val) => (rememberMe = val)" id="rememberMe" />
              <label for="rememberMe" class="ml-2 text-sm"> {{ $t('Remember me') }} </label>
            </div>
          </div>

          <Button type="submit" class="w-full">{{ t('Login') }}</Button>
        </form>
      </CardContent>
      <!-- <CardFooter class="flex justify-center items-center">
        {{ t(`Don't have an account?`) }}
        <NuxtLink to="/register" class="ml-1 text-blue-600 hover:text-blue-800 hover:underline no-underline">{{
          t('Sign up')
        }}</NuxtLink>
      </CardFooter> -->
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
const rememberMe = ref(false)
const { t } = useI18n()

const formSchema = toTypedSchema(
  z.object({
    mobile: z
      .string({
        required_error: t('Mobile is required'),
        invalid_type_error: 'Mobile must be a string'
      })
      .min(1, t('Mobile must contain at least 1 character(s)'))
      .max(10, t('Mobile must contain at most 10 character(s)')),
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
  authStore.login(values, rememberMe.value, t)
})
</script>

<style lang="scss" scoped></style>
