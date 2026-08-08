<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import ArtistCard from '@/components/artists/ArtistCard.vue'
import { fetchArtists, type Artist } from '@/api/artists'
import { fetchStyles, type Style } from '@/api/styles'
import { fetchTags, type Tag } from '@/api/tags'
import MultiSelectFilter from '@/components/filters/MultiSelectFilter.vue'

const artists = ref<Artist[]>([])
const isLoading = ref(true)
const errorMessage = ref('')
const searchQuery = ref('')
const city = ref('')
const state = ref('')

const styles = ref<number[]>([])
const availableStyles = ref<Style[]>([])

const tags = ref<number[]>([])
const availableTags = ref<Tag[]>([])


async function loadArtists() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await fetchArtists({
      q: searchQuery.value || undefined,
      city: city.value || undefined,
      state: state.value || undefined,
      styles: styles.value.length ? styles.value : undefined,
      tags: tags.value.length ? tags.value : undefined,
    })
    artists.value = response.data
  } catch {
    errorMessage.value = 'Não foi possível carregar o catálogo de artistas.'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  availableStyles.value = await fetchStyles()
  availableTags.value = await fetchTags()
  loadArtists()
})
</script>

<template>
  <AuthenticatedLayout
    eyebrow="Catálogo"
    title="Artistas"
    description="Consulte os artistas cadastrados e prepare filtros por estilo, cidade e localização."
  >
    <form class="catalog-filters" @submit.prevent="loadArtists">
      <label class="catalog-filters__field catalog-filters__field--grow">
        Busca
        <input v-model="searchQuery" type="search" placeholder="Nome, estúdio..." />
      </label>

      <label class="catalog-filters__field catalog-filters__field--grow">
        Cidade
        <input v-model="city" type="text" placeholder="São Paulo" />
      </label>

      <label class="catalog-filters__field catalog-filters__field--state">
        Estado
        <input v-model="state" type="text" maxlength="2" placeholder="SP" />
      </label>

      <div class="catalog-filters__break" aria-hidden="true"></div>

      <MultiSelectFilter
        label="Estilos"
        placeholder="Selecionar estilos"
        :options="availableStyles"
        v-model="styles"
      />

      <MultiSelectFilter
        label="Tags"
        placeholder="Selecionar tags"
        :options="availableTags"
        v-model="tags"
      />

      <button class="catalog-filters__submit" type="submit">Filtrar</button>
    </form>
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
