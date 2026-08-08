import { ref } from 'vue'

type Coords = {
  lat: number
  lng: number
}

export function useGeolocation() {
  const coords = ref<Coords | null>(null)
  const isLocating = ref(false)
  const locationError = ref('')

  async function requestLocation(): Promise<void> {
    isLocating.value = true
    locationError.value = ''
    coords.value = null

    try {
      if (!navigator.geolocation) {
        locationError.value = 'Geolocalização não suportada pelo navegador.'
        return
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      coords.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        if (error.code === error.PERMISSION_DENIED) {
          locationError.value = 'Permissão de localização negada.'
        } else if (error.code === error.TIMEOUT) {
          locationError.value = 'Tempo esgotado ao obter a localização.'
        } else {
          locationError.value = 'Não foi possível obter a localização.'
        }
      } else {
        locationError.value = 'Não foi possível obter a localização.'
      }
    } finally {
      isLocating.value = false
    }
  }

  return { coords, isLocating, locationError, requestLocation }
}
