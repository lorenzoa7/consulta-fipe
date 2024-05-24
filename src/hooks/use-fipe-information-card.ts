import { getFipeInformation } from '@/api/get-fipe-information'
import { useAppStore } from './use-app-store'

type Props = {
  fipeInformation: Awaited<ReturnType<typeof getFipeInformation>>
}

export function useFipeInformationCard({ fipeInformation }: Props) {
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

  function handleRemove() {
    useAppStore.setState((state) => {
      return {
        ...state,
        savedInformation: state.savedInformation.filter(
          (item) => item.id !== fipeInformation.id,
        ),
      }
    })
  }

  const updatedAtDate = new Date(fipeInformation.updatedAt)
  const date = {
    calendar: updatedAtDate.toLocaleDateString('pt-BR'),
    hours: updatedAtDate.getHours(),
    minutes: updatedAtDate.getMinutes(),
    seconds: updatedAtDate.getSeconds(),
  }

  return { handleSave, handleRemove, date, isSaved }
}
