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
  total_artists: number
  total_reviews: number
  total_favorites: number
}

export async function fetchDashboardSummary(): Promise<DashboardSummaryResponse> {
  const response = await http.get<{ data: DashboardSummaryResponse }>('/admin/metrics')
  return response.data.data
}