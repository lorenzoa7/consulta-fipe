'use client'

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
import { capitalizeFirstLetter } from '@/functions/capitalize-first-letter'
import { useSearchFipeForm } from '@/hooks/use-search-fipe-form'
import { useSearchFipeQueries } from '@/hooks/use-search-fipe-queries'
import { cn } from '@/lib/utils'
import { vehicleTypes } from '@/schemas/search-fipe-schema'
import { CheckIcon, ChevronsUpDownIcon, SearchIcon } from 'lucide-react'
import { FipeInformationCard } from './fipe-information-card'

export function SearchFipeForm() {
  const { form, typeWatch, brandWatch, modelWatch, yearWatch } =
    useSearchFipeForm()

  const {
    brands,
    fetchFipeInformation,
    fipeInformation,
    isFetchingBrands,
    isFetchingFipeInformation,
    isFetchingModels,
    isFetchingYears,
    models,
    years,
  } = useSearchFipeQueries({ typeWatch, brandWatch, modelWatch, yearWatch })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => fetchFipeInformation())}
        className="w-full space-y-6"
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
                            vehicleTypes.find((type) => type === field.value) ??
                              'carros',
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
                                (model) => String(model.codigo) === field.value,
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
                              years.find((year) => year.codigo === field.value)
                                ?.nome ?? 'Selecione o ano',
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
          <FipeInformationCard fipeInformation={fipeInformation} />
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
  )
}
