import type { DashboardStat } from '@/api/dashboard'

export const dashboardStats: DashboardStat[] = [
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

export const dashboardNextSteps: string[] = [
  'Definir quais números virão da API.',
  'Separar dados estáticos para troca futura.',
  'Preparar componentes reutilizáveis.',
]

export const dashboardRecentActivity: string[] = [
  'Login integrado com a API.',
  'Token persistido no navegador.',
  'Dashboard protegido por rota.',
]
