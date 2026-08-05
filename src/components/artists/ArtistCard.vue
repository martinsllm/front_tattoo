<script setup lang="ts">
import type { Artist } from '@/api/artists'

type Props = {
  artist: Artist
}

function favoritesLabel(count: number): string {
  return count === 1 ? '1 favorito' : `${count} favoritos`
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

    <div v-if="artist.rating || artist.favorites_count" class="artist-card-metrics">
      <span v-if="artist.rating" class="artist-card-metric">★ {{ artist.rating }}</span>
      <span v-if="artist.favorites_count" class="artist-card-metric">
        {{ favoritesLabel(artist.favorites_count) }}
      </span>
    </div>

    <ul v-if="artist.styles.length" class="artist-card-list">
      <li v-for="style in artist.styles" :key="style">
        <span class="artist-card-chip">{{ style }}</span>
      </li>
    </ul>

    <span v-if="artist.bio" class="artist-card-bio">{{ artist.bio }}</span>
  </article>
</template>
