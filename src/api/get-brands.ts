import { api } from '@/lib/axios'
import { VehicleType } from '@/schemas/search-fipe-schema'

export type GetBrandsRequest = {
  type: VehicleType
}

export type GetBrandsResponse = {
  codigo: string
  nome: string
}[]

export async function getBrands({ type }: GetBrandsRequest) {
  const response = await api.get<GetBrandsResponse>(`/${type}/marcas`)

  return response.data
}
