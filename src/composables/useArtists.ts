import { ref } from 'vue'
import { fetchArtists, type Artist, type ArtistListParams } from '@/api/artists'

export function useArtists() {
  const artists = ref<Artist[]>([])
  const isLoading = ref(true)
  const errorMessage = ref('')

  async function loadArtists(params: ArtistListParams) {
    isLoading.value = true
    errorMessage.value = ''
    try {
      const response = await fetchArtists(params)
      artists.value = response.data
    } catch {
      errorMessage.value = 'Não foi possível carregar o catálogo de artistas.'
    } finally {
      isLoading.value = false
    }
  }

  return { artists, isLoading, errorMessage, loadArtists }
}
