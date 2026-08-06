import { http } from '@/api/http'

export type Style = {
  id: number
  name: string
}

export async function fetchStyles(): Promise<Style[]> {
  const response = await http.get<{ data: Style[] }>('/styles')
  return response.data.data
}
