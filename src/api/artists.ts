import { http } from '@/api/http'

export type ArtistImage = {
  id: number
  url: string
  is_main: boolean
  created_at: string
}

export type Artist = {
  id: number
  studio_name: string
  bio: string | null
  city: string
  state: string
  contact: {
    instagram: string | null
    phone?: string | null
    address?: string | null
  }
  location: {
    latitude: number | null
    longitude: number | null
    distance?: number
  }
  rating?: number
  favorites_count?: number
  user?: {
    id: number
    name: string
  }
  styles: string[]
  tags: string[]
  main_image: ArtistImage | null
  created_at: string
}

export type ArtistSort = 'rating' | 'distance' | 'newest'

export type ArtistListParams = {
  styles?: number[]
  tags?: number[]
  city?: string
  state?: string
  q?: string
  lat?: number
  lng?: number
  radius?: number
  sort?: ArtistSort
  per_page?: number
}

export type ArtistListLinks = {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export type ArtistListMeta = {
  current_page: number
  total: number
  per_page: number
  last_page: number
}

export type ArtistListResponse = {
  data: Artist[]
  links: ArtistListLinks
  meta: ArtistListMeta
  message: string
}

export async function fetchArtists(params: ArtistListParams = {}): Promise<ArtistListResponse> {
  const response = await http.get<ArtistListResponse>('/artists', { params })
  return response.data
}
