import { http } from '@/api/http'

export type Tag = {
  id: number
  name: string
}

export async function fetchTags(): Promise<Tag[]> {
  const response = await http.get<{ data: Tag[] }>('/tags')
  return response.data.data
}