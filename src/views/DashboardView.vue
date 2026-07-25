<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

async function logout(): Promise<void> {
  await auth.logout()
  await router.push({ name: 'login' })
}
</script>

<template>
  <main class="dashboard-page">
    <section class="dashboard-header">
      <div>
        <span class="eyebrow">Painel</span>
        <h1>Bem-vindo ao Front Tattoo</h1>
        <p>Esta é a base inicial do painel consumindo a API Laravel.</p>
      </div>

      <button type="button" class="secondary-button" @click="logout">Sair</button>
    </section>

    <section class="dashboard-grid">
      <article class="dashboard-card">
        <span class="card-label">Usuário autenticado</span>
        <strong>{{ auth.user?.name }}</strong>
        <span>{{ auth.user?.email }}</span>
      </article>

      <article class="dashboard-card">
        <span class="card-label">Próximo passo</span>
        <strong>Conectar telas reais</strong>
        <span>Artistas, reviews, favoritos e área admin podem entrar aqui.</span>
      </article>
    </section>
  </main>
</template>
