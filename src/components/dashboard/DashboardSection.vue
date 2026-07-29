<script setup lang="ts">
type Props = {
  title: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <section class="dashboard-card">
    <span class="card-label">{{ title }}</span>
    <strong v-if="description">{{ description }}</strong>
    <slot />
  </section>
</template>
