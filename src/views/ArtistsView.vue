<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import ArtistCard from '@/components/artists/ArtistCard.vue'
import { fetchArtists, type Artist } from '@/api/artists'

const artists = ref<Artist[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const response = await fetchArtists()
    artists.value = response.data
  } catch {
    errorMessage.value = 'Não foi possível carregar o catálogo de artistas.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <AuthenticatedLayout
    eyebrow="Catálogo"
    title="Artistas"
    description="Consulte os artistas cadastrados e prepare filtros por estilo, cidade e localização."
  >
    <p v-if="isLoading" class="dashboard-status">Carregando artistas...</p>

    <p v-else-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>

    <section v-else-if="artists.length" class="dashboard-grid">
      <ArtistCard v-for="artist in artists" :key="artist.id" :artist="artist" />
    </section>

    <p v-else class="empty-message">Nenhum artista encontrado.</p>
  </AuthenticatedLayout>
</template>
