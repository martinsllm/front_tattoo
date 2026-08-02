import type { RouteRecordRaw } from 'vue-router'
import { DashboardView, ArtistsView, LoginView } from '@/views'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/artists',
    name: 'artists',
    component: ArtistsView,
    meta: {
      requiresAuth: true,
    },
  },
]
