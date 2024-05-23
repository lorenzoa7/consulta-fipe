import { z } from 'zod'

export const vehicleTypes = ['carros', 'motos', 'caminhoes'] as const
export type VehicleType = (typeof vehicleTypes)[number]

export const searchFipeSchema = z.object({
  type: z.enum(vehicleTypes),
  brand: z.string().min(1, 'Este campo não pode ser vazio.'),
  model: z.string().min(1, 'Este campo não pode ser vazio.'),
  year: z.string().min(1, 'Este campo não pode ser vazio.'),
})

export type SearchFipeSchema = z.infer<typeof searchFipeSchema>
