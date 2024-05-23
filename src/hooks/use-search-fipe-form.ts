import {
  SearchFipeSchema,
  searchFipeSchema,
} from '@/schemas/search-fipe-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export function useSearchFipeForm() {
  const [open, setOpen] = useState({
    type: false,
    brand: false,
    model: false,
    year: false,
  })

  const form = useForm<SearchFipeSchema>({
    resolver: zodResolver(searchFipeSchema),
    defaultValues: {
      type: 'carros',
      brand: '',
      model: '',
      year: '',
    },
  })

  const { watch, resetField } = form

  const {
    type: typeWatch,
    brand: brandWatch,
    model: modelWatch,
    year: yearWatch,
  } = watch()

  useEffect(() => {
    if (typeWatch && typeWatch.length > 0) {
      resetField('brand')
      resetField('model')
      resetField('year')
    }
  }, [typeWatch, resetField])

  useEffect(() => {
    if (brandWatch && brandWatch.length > 0) {
      resetField('model')
      resetField('year')
    }
  }, [brandWatch, resetField])

  useEffect(() => {
    if (modelWatch && modelWatch.length > 0) {
      resetField('year')
    }
  }, [modelWatch, resetField])

  return { form, typeWatch, brandWatch, modelWatch, yearWatch, open, setOpen }
}
