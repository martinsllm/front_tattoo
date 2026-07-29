<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DashboardStatCard from '@/components/dashboard/DashboardStatCard.vue'
import DashboardSection from '@/components/dashboard/DashboardSection.vue'
import { dashboardStats, dashboardNextSteps, dashboardRecentActivity } from '@/data/dashboard'

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
          <li v-for="step in dashboardNextSteps" :key="step">{{ step }}</li>
        </ul>
      </DashboardSection>

      <DashboardSection title="Atividade recente" description="Base autenticada pronta">
        <ul class="dashboard-list">
          <li v-for="activity in dashboardRecentActivity" :key="activity">{{ activity }}</li>
        </ul>
      </DashboardSection>
    </section>
  </main>
</template>
