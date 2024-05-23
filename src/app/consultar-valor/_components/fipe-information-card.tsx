import { getFipeInformation } from '@/api/get-fipe-information'
import { vehicleTypeIds } from '@/config/vehicle'
import { BikeIcon, CarIcon, TruckIcon } from 'lucide-react'

type Props = {
  fipeInformation: Awaited<ReturnType<typeof getFipeInformation>>
}

export function FipeInformationCard({ fipeInformation }: Props) {
  return (
    <div className="flex gap-2 rounded-lg bg-emerald-700 p-5 text-primary-foreground dark:bg-emerald-300">
      {vehicleTypeIds[fipeInformation.tipoVeiculo] === 'carros' && (
        <CarIcon className="size-8" />
      )}
      {vehicleTypeIds[fipeInformation.tipoVeiculo] === 'motos' && (
        <BikeIcon className="size-8" />
      )}
      {vehicleTypeIds[fipeInformation.tipoVeiculo] === 'caminhoes' && (
        <TruckIcon className="size-8" />
      )}

      <div className="flex flex-col gap-2">
        <span className="font-bold">{`${fipeInformation.marca} ${fipeInformation.modelo} ${fipeInformation.anoModelo}`}</span>
        <span className="text-3xl font-black">{fipeInformation.valor}</span>
      </div>
    </div>
  )
}
