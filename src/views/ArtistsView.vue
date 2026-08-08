<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import ArtistCard from '@/components/artists/ArtistCard.vue'
import { fetchStyles, type Style } from '@/api/styles'
import { fetchTags, type Tag } from '@/api/tags'
import MultiSelectFilter from '@/components/filters/MultiSelectFilter.vue'
import { useArtists } from '@/composables/useArtists'
import { useGeolocation } from '@/composables/useGeolocation'

const { artists, isLoading, errorMessage, loadArtists } = useArtists()
const { coords, isLocating, locationError, requestLocation } = useGeolocation()
const searchQuery = ref('')
const city = ref('')
const state = ref('')
const radius = ref(10)

const styles = ref<number[]>([])
const availableStyles = ref<Style[]>([])

const tags = ref<number[]>([])
const availableTags = ref<Tag[]>([])

function searchArtists() {
  return loadArtists({
    q: searchQuery.value || undefined,
    city: city.value || undefined,
    state: state.value || undefined,
    styles: styles.value.length ? styles.value : undefined,
    tags: tags.value.length ? tags.value : undefined,
    lat: coords.value?.lat,
    lng: coords.value?.lng,
    radius: coords.value ? radius.value : undefined,
    sort: coords.value ? 'distance' : undefined,
  })
}

async function locateAndSearch() {
  await requestLocation()

  if (coords.value) {
    await searchArtists()
  }
}

onMounted(async () => {
  const [stylesList, tagsList] = await Promise.all([fetchStyles(), fetchTags()])

  availableStyles.value = stylesList
  availableTags.value = tagsList

  await searchArtists()
})
</script>

<template>
  <AuthenticatedLayout
    eyebrow="Catálogo"
    title="Artistas"
    description="Consulte os artistas cadastrados e prepare filtros por estilo, cidade e localização."
  >
    <form class="catalog-filters" @submit.prevent="searchArtists">
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

      <button
        class="catalog-filters__locate"
        type="button"
        :disabled="isLocating"
        :aria-label="isLocating ? 'Localizando...' : 'Usar minha localização'"
        :title="isLocating ? 'Localizando...' : 'Usar minha localização'"
        @click="locateAndSearch"
      >
        <svg
          v-if="!isLocating"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 21s-6-5.7-6-11a6 6 0 1 1 12 0c0 5.3-6 11-6 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        <span v-else aria-hidden="true">…</span>
      </button>

      <p v-if="locationError" class="error-message">
        {{ locationError }}
      </p>

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
