import axios from 'axios'
import { useAuthStore } from '~/store/auth'
import { API_ROOT } from '~/utils/constants'

import { v4 as uuidv4 } from 'uuid'

const auth_refresh_url = `${API_ROOT.baseUrl}/authentication/renew-token`

const api = axios.create({
  baseUrl: API_ROOT.baseUrl
})

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error
    const originalRequest = response.config
    const deviceId = uuidv4()

    if (response.status === 403 && response.data.message === 'Token expired') {
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            auth_refresh_url,
            { token: refreshToken },
            {
              headers: {
                'x-device-id': deviceId
              }
            }
          )

          const { accessToken: newAccessToken } = refreshResponse.data

          localStorage.setItem('accessToken', newAccessToken)

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

          return api(originalRequest)
        } catch (refreshError) {
          console.error('Refresh token failed', refreshError)
          useAuthStore().logout()
          return Promise.reject(refreshError)
        }
      } else {
        useAuthStore().logout()
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default api
