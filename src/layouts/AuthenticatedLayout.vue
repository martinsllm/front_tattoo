<script setup lang="ts">
type Props = {
  eyebrow?: string
  title: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <main class="dashboard-page">
    <section class="dashboard-header">
      <div>
        <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
        <h1>{{ title }}</h1>
        <p v-if="description">{{ description }}</p>
      </div>

      <nav class="authenticated-nav" aria-label="Navegação principal">
        <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
        <RouterLink :to="{ name: 'artists' }">Artistas</RouterLink>
      </nav>

      <slot name="actions" />
    </section>

    <slot />
  </main>
</template>
