<template>
  <div class="w-screen h-screen flex justify-center items-center bg-gray-100">
    <Card>
      <CardHeader>
        <CardTitle class="flex justify-between items-center">
          <span>{{ t('Register') }}</span>
          <LangSwitch />
        </CardTitle>
        <CardDescription>{{ t('Sign up to get started with your new account.') }}</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="w-[400px] space-y-4">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="phoneNumber">
            <FormItem>
              <FormLabel>{{ t('Phone Number') }}</FormLabel>
              <FormControl>
                <Input type="tel" :placeholder="t('Phone Number')" v-bind="componentField" />
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

          <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
              <FormLabel>{{ t('Confirm Password') }}</FormLabel>
              <FormControl>
                <Input type="password" :placeholder="t('Confirm Password')" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full">{{ t('Sign Up') }}</Button>
        </form>
      </CardContent>
      <CardFooter class="flex justify-center items-center">
        {{ t('Already have an account?') }}
        <NuxtLink to="/login" class="ml-1 text-blue-600 hover:text-blue-800 hover:underline no-underline">
          {{ t('Login') }}
        </NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

definePageMeta({
  layout: 'login',
  middleware: 'auth'
})
const { t } = useI18n()

const formSchema = toTypedSchema(
  z
    .object({
      email: z
        .string({
          required_error: t('Email is required'),
          invalid_type_error: 'Email must be a string'
        })
        .email(t('Invalid email address')),
      phoneNumber: z
        .string({
          required_error: t('Phone number is required'),
          invalid_type_error: 'Phone number must be a string'
        })
        .min(10, t('Phone number must be at least 10 digits'))
        .max(15, t('Phone number must be at most 15 digits')),
      password: z
        .string({
          required_error: t('Password is required'),
          invalid_type_error: 'Password must be a string'
        })
        .min(6, t('Password must be at least 6 characters long')),
      confirmPassword: z
        .string({
          required_error: t('Password is required'),
          invalid_type_error: 'Confirm password must be a string'
        })
        .min(6, t('Password must be at least 6 characters long'))
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          path: ['confirmPassword'],
          message: t('Password do not match')
        })
      }
    })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<style lang="scss" scoped></style>
