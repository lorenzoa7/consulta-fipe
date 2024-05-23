import { getBrands } from '@/api/get-brands'
import { getFipeInformation } from '@/api/get-fipe-information'
import { getModels } from '@/api/get-models'
import { getYears } from '@/api/get-years'
import { SearchFipeSchema } from '@/schemas/search-fipe-schema'
import { useQuery } from '@tanstack/react-query'

type Props = {
  typeWatch: SearchFipeSchema['type']
  brandWatch: SearchFipeSchema['brand']
  modelWatch: SearchFipeSchema['model']
  yearWatch: SearchFipeSchema['year']
}

export function useSearchFipeQueries({
  typeWatch,
  brandWatch,
  modelWatch,
  yearWatch,
}: Props) {
  const { data: brands, isFetching: isFetchingBrands } = useQuery({
    queryKey: ['brands', typeWatch],
    queryFn: () => getBrands({ type: typeWatch }),
    staleTime: 1000 * 60 * 60 * 3,
  })

  const { data: models, isFetching: isFetchingModels } = useQuery({
    queryKey: ['models', typeWatch, brandWatch],
    queryFn: () => getModels({ type: typeWatch, brandId: brandWatch }),
    enabled: !!brandWatch && brandWatch.length > 0,
    staleTime: 1000 * 60 * 60 * 3,
  })

  const { data: years, isFetching: isFetchingYears } = useQuery({
    queryKey: ['years', typeWatch, brandWatch, modelWatch],
    queryFn: () =>
      getYears({ type: typeWatch, brandId: brandWatch, modelId: modelWatch }),
    enabled:
      !!brandWatch &&
      brandWatch.length > 0 &&
      !!modelWatch &&
      modelWatch.length > 0,
    staleTime: 1000 * 60 * 60 * 3,
  })

  const {
    data: fipeInformation,
    isFetching: isFetchingFipeInformation,
    refetch: fetchFipeInformation,
  } = useQuery({
    queryKey: ['fipe-value', typeWatch, brandWatch, modelWatch, yearWatch],
    queryFn: () =>
      getFipeInformation({
        type: typeWatch,
        brandId: brandWatch,
        modelId: modelWatch,
        yearId: yearWatch,
      }),
    enabled: false,
    staleTime: 1000 * 60 * 60 * 3,
  })

  return {
    brands,
    isFetchingBrands,
    models,
    isFetchingModels,
    years,
    isFetchingYears,
    fipeInformation,
    isFetchingFipeInformation,
    fetchFipeInformation,
  }
}
