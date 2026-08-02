<script setup lang="ts">
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
</script>

<template>
  <AuthenticatedLayout
    eyebrow="Catálogo"
    title="Artistas"
    description="Consulte os artistas cadastrados e prepare filtros por estilo, cidade e localização."
  >
    <section class="dashboard-card">
      <span class="card-label">Catálogo de artistas</span>
      <strong>Listagem em preparação</strong>
      <span>Os artistas serão carregados a partir da API nas próximas etapas.</span>
    </section>
  </AuthenticatedLayout>
</template>
