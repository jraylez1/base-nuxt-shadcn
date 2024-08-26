import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    async login(values, t) {
      const router = useRouter()
      if (values.username === 'admin' && values.password === '123456') {
        this.isLoggedIn = true
        localStorage.setItem('accessToken', '123456')
        router.push({ path: '/dashboard' })
      } else {
        this.isLoggedIn = false
        toast.error(t('Wrong username or password'))
      }
    },
    async logout() {
      const router = useRouter()
      this.isLoggedIn = false
      localStorage.removeItem('accessToken')
      router.push({ path: '/login' })
    },
    async checkSession() {
      if (process.client) {
        const token = localStorage.getItem('accessToken')
        this.isLoggedIn = !!token
      } else {
        this.isLoggedIn = false
      }
      return Promise.resolve()
    }
  }
})
