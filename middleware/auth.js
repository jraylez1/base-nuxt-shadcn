import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  await authStore.checkSession()

  const isLoggedIn = authStore.isLoggedIn
  const isLoginOrSignUpPage = to.path === '/login' || to.path === '/register'

  if (isLoggedIn) {
    if (isLoginOrSignUpPage) {
      return navigateTo('/dashboard')
    }
    return
  }

  if (!isLoginOrSignUpPage) {
    return navigateTo('/login')
  }
})
