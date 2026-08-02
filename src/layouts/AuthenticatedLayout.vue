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

      <slot name="actions" />
    </section>

    <slot />
  </main>
</template>
