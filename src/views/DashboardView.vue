<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DashboardStatCard from '@/components/dashboard/DashboardStatCard.vue'
import DashboardSection from '@/components/dashboard/DashboardSection.vue'
import { dashboardStats, dashboardNextSteps, dashboardRecentActivity } from '@/data/dashboard'
import { fetchDashboardSummary, type DashboardSummaryResponse } from '@/api/dashboard'


const router = useRouter()
const auth = useAuthStore()

const isDashboardLoading = ref(true)
const dashboardError = ref('')
const summary = ref<DashboardSummaryResponse | null>(null)

onMounted(async () => {
  try {
    summary.value = await fetchDashboardSummary()
  } catch {
    dashboardError.value = 'Não foi possível carregar os dados do dashboard'
  } finally {
    isDashboardLoading.value = false
  }
})

const resolvedDashboardStats = computed(() => {
  if (!summary.value) return dashboardStats

  return dashboardStats.map((stat) => {
    if(stat.label === 'Artistas cadastrados') {
      return {
        ...stat,
        value: summary.value.total_artists,
      }
    }

    if(stat.label === 'Avaliações recebidas') {
      return {
        ...stat,
        value: summary.value.total_reviews,
      }
    }

    if(stat.label === 'Favoritos') {
      return {
        ...stat,
        value: summary.value.total_favorites,
      }
    }

    return stat
  })
})

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
        v-for="stat in resolvedDashboardStats"
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
