import { api } from '@/lib/axios'
import { VehicleType } from '@/schemas/search-fipe-schema'

export type GetFipeInformationRequest = {
  type: VehicleType
  brandId: string
  modelId: string
  yearId: string
}

export type GetFipeInformationResponse = {
  TipoVeiculo: 1 | 2 | 3
  Valor: string
  Marca: string
  Modelo: string
  AnoModelo: number
  Combustivel: string
  CodigoFipe: string
  MesReferencia: string
  SiglaCombustivel: string
}

function formatApiResponse(data: GetFipeInformationResponse) {
  return {
    tipoVeiculo: data.TipoVeiculo,
    valor: data.Valor,
    marca: data.Marca,
    modelo: data.Modelo,
    anoModelo: data.AnoModelo,
    combustivel: data.Combustivel,
    codigoFipe: data.CodigoFipe,
    mesReferencia: data.MesReferencia,
    siglaCombustivel: data.SiglaCombustivel,
  }
}

export async function getFipeInformation({
  type,
  brandId,
  modelId,
  yearId,
}: GetFipeInformationRequest) {
  const response = await api.get<GetFipeInformationResponse>(
    `/${type}/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`,
  )

  return formatApiResponse(response.data)
}
