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