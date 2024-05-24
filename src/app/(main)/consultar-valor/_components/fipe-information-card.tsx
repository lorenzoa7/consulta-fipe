import { getFipeInformation } from '@/api/get-fipe-information'
import { Button } from '@/components/ui/button'
import { vehicleTypeIds } from '@/config/vehicle'
import { useFipeInformationCard } from '@/hooks/use-fipe-information-card'
import { BikeIcon, BookmarkIcon, CarIcon, TruckIcon, XIcon } from 'lucide-react'

type Props = {
  fipeInformation: Awaited<ReturnType<typeof getFipeInformation>>
  isInSavedList?: boolean
}

export function FipeInformationCard({
  fipeInformation,
  isInSavedList = false,
}: Props) {
  const { date, handleRemove, handleSave, isSaved } = useFipeInformationCard({
    fipeInformation,
  })

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-emerald-700 p-5 text-primary-foreground dark:bg-emerald-300 md:flex-row">
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
        <span className="font-light">
          atualizado em:{' '}
          {`${date.calendar}, ${date.hours}:${date.minutes}:${date.seconds}`}
        </span>
      </div>
      {isInSavedList ? (
        <Button
          size="sm"
          variant="secondary"
          type="button"
          className="ml-auto"
          onClick={handleRemove}
        >
          <XIcon className="mr-2 size-4" />
          Remover
        </Button>
      ) : (
        <Button
          size="sm"
          variant="secondary"
          type="button"
          className="ml-auto"
          onClick={handleSave}
        >
          <BookmarkIcon
            data-saved={isSaved}
            className="mr-2 size-4 data-[saved=true]:fill-foreground"
          />
          Salvar
        </Button>
      )}
    </div>
  )
}
