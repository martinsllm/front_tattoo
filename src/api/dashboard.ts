import { http } from '@/api/http'

export type DashboardStat = {
  label: string
  value: string | number
  description: string
}

export type DashboardSummary = {
  stats: DashboardStat[]
  nextSteps: string[]
  recentActivity: string[]
}

export type DashboardSummaryResponse = {
  artists_total: number
  reviews_total: number
  favorites_total: number
}

export async function fetchDashboardSummary(): Promise<DashboardSummaryResponse> {
  const response = await http.get<{ data: DashboardSummaryResponse }>('/metrics')
  return response.data.data
}