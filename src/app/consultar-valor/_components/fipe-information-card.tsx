import { getFipeInformation } from '@/api/get-fipe-information'
import { Button } from '@/components/ui/button'
import { vehicleTypeIds } from '@/config/vehicle'
import { useAppStore } from '@/hooks/use-app-store'
import { BikeIcon, BookmarkIcon, CarIcon, TruckIcon } from 'lucide-react'

type Props = {
  fipeInformation: Awaited<ReturnType<typeof getFipeInformation>>
}

export function FipeInformationCard({ fipeInformation }: Props) {
  const { savedInformation } = useAppStore()
  const isSaved = savedInformation.some(
    (item) => item.id === fipeInformation.id,
  )

  function handleSave() {
    useAppStore.setState((state) => {
      if (isSaved) {
        return {
          ...state,
          savedInformation: state.savedInformation.filter(
            (item) => item.id !== fipeInformation.id,
          ),
        }
      }

      return {
        ...state,
        savedInformation: state.savedInformation.concat(fipeInformation),
      }
    })
  }

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
        <span className="font-light">
          atualizado em: {fipeInformation.updatedAt.toLocaleString()}
        </span>
      </div>
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
    </div>
  )
}
