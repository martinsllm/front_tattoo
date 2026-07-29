<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DashboardStatCard from '@/components/dashboard/DashboardStatCard.vue'
import DashboardSection from '@/components/dashboard/DashboardSection.vue'

const router = useRouter()
const auth = useAuthStore()

const dashboardStats = [
  {
    label: 'Artistas cadastrados',
    value: '24',
    description: 'Perfis disponíveis para consulta.',
  },

  {
    label: 'Avaliações recebidas',
    value: '128',
    description: 'Avaliações registradas na plataforma.',
  },

  {
    label: 'Favoritos',
    value: '36',
    description: 'Artistas salvos pelos usuários.',
  },

  {
    label: 'Próximo passo',
    value: 'Integrar dados reais',
    description: 'Substituir os números mockados por respostas da API.',
  },
]

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
      <DashboardStatCard
        v-for="stat in dashboardStats"
        :key="stat.label"
        :label="stat.label"
        :value="stat.value"
        :description="stat.description"
      />
    </section>

    <section class="dashboard-content">
      <DashboardSection title="Próximas ações" description="Organizar dados do dashboard">
        <ul class="dashboard-list">
          <li>Definir quais números virão da API.</li>
          <li>Separar mocks para troca futura.</li>
          <li>Preparar componentes reutilizáveis.</li>
        </ul>
      </DashboardSection>

      <DashboardSection title="Atividade recente" description="Base autenticada pronta">
        <ul class="dashboard-list">
          <li>Login integrado com a API.</li>
          <li>Token persistido no navegador.</li>
          <li>Dashboard protegido por rota.</li>
        </ul>
      </DashboardSection>
    </section>
  </main>
</template>
