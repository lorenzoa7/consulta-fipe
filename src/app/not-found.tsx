import { LogoIcon } from '@/components/icons/logo'
import { buttonVariants } from '@/components/ui/button'
import { siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative flex flex-col items-center justify-around rounded border border-border bg-background p-4 text-center shadow-lg sm:p-8">
        <LogoIcon className="mb-5 size-8 fill-foreground sm:size-14" />
        <h1 className="text-6xl font-extrabold sm:text-9xl ">404</h1>
        <span className="text-2xl font-semibold uppercase sm:text-4xl">
          Página não encontrada.
        </span>

        <p className="my-5 text-sm sm:max-w-96 sm:text-base">
          A página que você procura foi <br />
          removida, renomeada or pode nunca ter existido.
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
