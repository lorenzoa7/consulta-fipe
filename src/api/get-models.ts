import { api } from '@/lib/axios'
import { VehicleType } from '@/schemas/search-fipe-schema'

export type GetModelsRequest = {
  type: VehicleType
  brandId: string
}

export type GetModelsResponse = {
  modelos: {
    codigo: number
    nome: string
  }[]
  anos: {
    codigo: string
    nome: string
  }[]
}

export async function getModels({ type, brandId }: GetModelsRequest) {
  const response = await api.get<GetModelsResponse>(
    `/${type}/marcas/${brandId}/modelos`,
  )

  return response.data.modelos
}
