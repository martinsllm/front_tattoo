import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { authTokenStorageKey, http } from '@/api/http'

type User = {
  id: number
  name: string
  email: string
  roles?: string[]
}

type LoginPayload = {
  email: string
  password: string
}

type ApiResponse<T> = {
  data: T
  message: string
}

type LoginResponse = {
  user: User
  token: string
  expires_at: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(authTokenStorageKey))
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => Boolean(token.value))

  async function login(payload: LoginPayload): Promise<void> {
    isLoading.value = true

    try {
      const response = await http.post<ApiResponse<LoginResponse>>('/login', payload)

      token.value = response.data.data.token
      user.value = response.data.data.user
      localStorage.setItem(authTokenStorageKey, response.data.data.token)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCurrentUser(): Promise<void> {
    if (!token.value) {
      return
    }

    const response = await http.get<ApiResponse<User>>('/me')

    user.value = response.data.data
  }

  async function logout(): Promise<void> {
    if (token.value) {
      await http.post('/logout')
    }

    token.value = null
    user.value = null
    localStorage.removeItem(authTokenStorageKey)
  }

  function clearSession(): void {
    token.value = null
    user.value = null
    localStorage.removeItem(authTokenStorageKey)
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    fetchCurrentUser,
    logout,
    clearSession,
  }
})
