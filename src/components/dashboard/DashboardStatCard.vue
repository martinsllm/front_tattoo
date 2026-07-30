<script setup lang="ts">
type Props = {
  label: string
  value: string | number
  description: string
}

defineProps<Props>()
</script>

<template>
  <article class="dashboard-card">
    <span class="card-label">{{ label }}</span>
    <strong>{{ value }}</strong>
    <span>{{ description }}</span>
  </article>
</template>
