'use client'

import { LogoIcon } from '@/components/icons/logo'
import { buttonVariants } from '@/components/ui/button'
import { siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = {
  error: Error & { digest?: string }
}

export default function ErrorBoundary({ error }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-500 dark:bg-red-800">
      <div className="relative flex flex-col items-center justify-around rounded border border-border bg-background p-4 text-center shadow-lg sm:p-8">
        <LogoIcon className="mb-5 size-8 fill-foreground sm:size-14" />
        <span className="text-2xl font-semibold uppercase sm:text-4xl">
          Algo deu errado!
        </span>

        <p className="my-5 text-sm sm:max-w-96 sm:text-base">
          {error.message.length > 0 &&
          error.message !==
            'An error occurred in the Server Components render but no message was provided'
            ? error.message
            : 'Um problema foi identificado no sistema. Entre em contato com algum administrador.'}
        </p>

        <Link
          href={siteRoutes.consultarValor}
          className={cn(
            buttonVariants({ size: 'sm', variant: 'default' }),
            'uppercase',
          )}
        >
          Ir para o aplicativo
        </Link>
      </div>
    </div>
  )
}
