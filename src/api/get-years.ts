import { api } from '@/lib/axios'
import { VehicleType } from '@/schemas/search-fipe-schema'

export type GetYearsRequest = {
  type: VehicleType
  brandId: string
  modelId: string
}

export type GetYearsResponse = {
  codigo: string
  nome: string
}[]

export async function getYears({ type, brandId, modelId }: GetYearsRequest) {
  const response = await api.get<GetYearsResponse>(
    `/${type}/marcas/${brandId}/modelos/${modelId}/anos`,
  )

  return response.data
}
