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
        <h1>Olá, {{ auth.user?.name }}!</h1>
        <p>Acompanhe seus dados principais, próximas ações e movimentações recentes.</p>
      </div>

      <button type="button" class="secondary-button" @click="logout">Sair</button>
    </section>

    <section class="dashboard-grid">
      <article class="dashboard-card">
        <span class="card-label">Artistas cadastrados</span>
        <strong>24</strong>
        <span>Perfis disponíveis para consulta.</span>
      </article>

      <article class="dashboard-card">
        <span class="card-label">Avaliações recebidas</span>
        <strong>128</strong>
        <span>Avaliações registradas na plataforma.</span>
      </article>

      <article class="dashboard-card">
        <span class="card-label">Favoritos</span>
        <strong>36</strong>
        <span>Artistas salvos pelos usuários.</span>
      </article>

      <article class="dashboard-card">
        <span class="card-label">Próximo passo</span>
        <strong>Integrar dados reais</strong>
        <span>Substituir os números mockados por respostas da API.</span>
      </article>
    </section>

    <section class="dashboard-content">
      <article class="dashboard-card">
        <span class="card-label">Próximas ações</span>
        <strong>Organizar dados do dashboard</strong>
          <ul class="dashboard-list">
            <li>Definir quais números virão da API.</li>
            <li>Separar mocks para troca futura.</li>
            <li>Preparar componentes reutilizáveis.</li>
          </ul>
      </article>

      <article class="dashboard-card">
      <span class="card-label">Atividade recente</span>
        <strong>Base autenticada pronta</strong>
        <ul class="dashboard-list">
          <li>Login integrado com a API.</li>
          <li>Token persistido no navegador.</li>
          <li>Dashboard protegido por rota.</li>
        </ul>
      </article>
    </section>
  </main>
</template>
