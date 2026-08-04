<script setup lang="ts">
import type { Artist } from '@/api/artists'

type Props = {
  artist: Artist
}

defineProps<Props>()
</script>

<template>
  <article class="dashboard-card">
    <img
      v-if="artist.main_image"
      class="artist-card-image"
      :src="artist.main_image.url"
      :alt="artist.studio_name"
    />

    <span class="card-label">{{ artist.city }} / {{ artist.state }}</span>
    <strong>{{ artist.studio_name }}</strong>
    <span v-if="artist.bio" class="artist-card-bio">{{ artist.bio }}</span>
  </article>
</template>
