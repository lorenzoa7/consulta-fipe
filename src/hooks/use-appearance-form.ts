import { AppearanceSchema, appearanceSchema } from '@/schemas/appearance-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import { useForm } from 'react-hook-form'

export function useAppearanceForm() {
  const { setTheme, resolvedTheme } = useTheme()
  const form = useForm<AppearanceSchema>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      theme: resolvedTheme,
    },
  })

  function onSubmit(data: AppearanceSchema) {
    const { theme } = data

    if (theme === 'light' || theme === 'dark') {
      setTheme(theme)
      return
    }

    setTheme('light')
  }

  return {
    onSubmit,
    form,
  }
}
