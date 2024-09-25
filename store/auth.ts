import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import { v4 as uuidv4 } from 'uuid'
import api from '~/utils/axiosRequest'

interface LoginData {
  mobile: string
  password: string
}

const auth_login_url = `${API_ROOT.baseUrl}/authentication/signin`

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    async login(values: LoginData, rememberMe: boolean, t: any) {
      const router = useRouter()
      const deviceId = uuidv4()
      try {
        console.log(values)
        const response = await api.post(
          auth_login_url,
          {
            mobile: values.mobile,
            password: values.password,
            deviceId
          },
          {
            headers: {
              'x-device-id': deviceId
            }
          }
        )
        if (response && response.data) {
          this.isLoggedIn = true
          localStorage.setItem('accessToken', response.data.accessToken)
          localStorage.setItem('user', response.data.user)
          if (rememberMe) {
            localStorage.setItem('refreshToken', response.data.refreshToken)
          }
          router.push({ path: '/dashboard' })
        }
        return true
      } catch (error: any) {
        toast.error(t(error.response.data.instance))
        return null
      }
    },
    async logout() {
      const router = useRouter()
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      this.isLoggedIn = false
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
