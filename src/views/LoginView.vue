<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function submit(): Promise<void> {
  errorMessage.value = ''

  try {
    await auth.login({
      email: email.value,
      password: password.value,
    })

    await router.push({ name: 'dashboard' })
  } catch (error) {
    if (error instanceof AxiosError) {
      errorMessage.value = error.response?.data?.message ?? 'Não foi possível autenticar.'

      return
    }

    errorMessage.value = 'Não foi possível autenticar.'
  }
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <span class="eyebrow">API Tattoo</span>
      <h1>Entrar no painel</h1>
      <p>Use seu usuário da API para acessar a área administrativa.</p>

      <form class="auth-form" @submit.prevent="submit">
        <label>
          E-mail
          <input v-model="email" type="email" autocomplete="email" required />
        </label>

        <label>
          Senha
          <input v-model="password" type="password" autocomplete="current-password" required />
        </label>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <button type="submit" :disabled="auth.isLoading">
          {{ auth.isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
    </section>
  </main>
</template>
