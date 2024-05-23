'use client'

import { getBrands } from '@/api/get-brands'
import { getFipeInformation } from '@/api/get-fipe-information'
import { getModels } from '@/api/get-models'
import { getYears } from '@/api/get-years'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Spinner from '@/components/ui/spinner'
import { vehicleTypeIds } from '@/config/vehicle'
import { capitalizeFirstLetter } from '@/functions/capitalize-first-letter'
import { cn } from '@/lib/utils'
import {
  SearchFipeSchema,
  searchFipeSchema,
  vehicleTypes,
} from '@/schemas/search-fipe-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import {
  BikeIcon,
  CarIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  SearchIcon,
  TruckIcon,
} from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function SearchFipeForm() {
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

  function onSubmit() {
    fetchFipeInformation()
  }

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

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tipo de veículo</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? capitalizeFirstLetter(
                              vehicleTypes.find(
                                (type) => type === field.value,
                              ) ?? 'carros',
                            )
                          : 'Selecione o tipo'}
                        <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0"
                  >
                    <Command>
                      <CommandInput placeholder="Procurar tipo..." />
                      <CommandEmpty>Nenhum tipo encontrado.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {vehicleTypes.map((type) => (
                            <CommandItem
                              value={type}
                              key={type}
                              onSelect={() => {
                                form.setValue('type', type)
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  type === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {capitalizeFirstLetter(type)}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          {isFetchingBrands && <Spinner />}
          {!isFetchingBrands && brands && (
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Marca</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? capitalizeFirstLetter(
                                brands.find(
                                  (brand) => brand.codigo === field.value,
                                )?.nome ?? 'Selecione a marca',
                              )
                            : 'Selecione a marca'}
                          <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput placeholder="Procurar marca..." />
                        <CommandEmpty>Nenhuma marca encontrada.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {brands.map((brand) => (
                              <CommandItem
                                value={brand.nome}
                                key={brand.codigo}
                                onSelect={() => {
                                  form.setValue('brand', brand.codigo)
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    brand.codigo === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {brand.nome}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {isFetchingModels && <Spinner />}
          {!isFetchingModels && models && (
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Modelo</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? capitalizeFirstLetter(
                                models.find(
                                  (model) =>
                                    String(model.codigo) === field.value,
                                )?.nome ?? 'Selecione o modelo',
                              )
                            : 'Selecione o modelo'}
                          <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput placeholder="Procurar marca..." />
                        <CommandEmpty>Nenhum modelo encontrada.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {models.map((model) => (
                              <CommandItem
                                value={model.nome}
                                key={String(model.codigo)}
                                onSelect={() => {
                                  form.setValue('model', String(model.codigo))
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    String(model.codigo) === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {model.nome}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {isFetchingYears && <Spinner />}
          {!isFetchingYears && years && (
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ano</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? capitalizeFirstLetter(
                                years.find(
                                  (year) => year.codigo === field.value,
                                )?.nome ?? 'Selecione o ano',
                              )
                            : 'Selecione o ano'}
                          <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput placeholder="Procurar ano..." />
                        <CommandEmpty>Nenhum ano encontrado.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {years.map((year) => (
                              <CommandItem
                                value={year.nome}
                                key={year.codigo}
                                onSelect={() => {
                                  form.setValue('year', year.codigo)
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    year.codigo === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {year.nome}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {!isFetchingFipeInformation && fipeInformation && (
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
                <span className="text-3xl font-black">
                  {fipeInformation.valor}
                </span>
              </div>
            </div>
          )}
          <Button type="submit">
            {isFetchingFipeInformation ? (
              <Spinner className="mr-2 size-4" />
            ) : (
              <SearchIcon className="mr-2 size-4" />
            )}
            <span>Consultar</span>
          </Button>
        </form>
      </Form>
    </div>
  )
}
