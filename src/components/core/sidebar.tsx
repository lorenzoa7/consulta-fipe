'use client'

import { navConfig } from '@/config/nav'
import { projectRepositoryUrl } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GithubIcon } from '../icons/github'
import { LogoIcon } from '../icons/logo'
import { buttonVariants } from '../ui/button'

export function Sidebar() {
  const pathname = usePathname()
  const paths = pathname.split('/')

  return (
    <aside className="flex flex-col space-y-6 border-r border-border">
      <header className="flex select-none items-center gap-3 border-b border-border p-6">
        <LogoIcon className="size-6 dark:fill-foreground" />
        <h1 className="text-xl font-semibold">Consulta Fipe</h1>
      </header>

      <main className="grow flex-col px-3">
        <nav className="flex flex-col gap-2">
          {navConfig.map(({ title, href, icon: Icon }) => {
            const hrefPaths = href.split('/')
            return (
              <Link
                key={title}
                href={href}
                data-active={
                  paths.length > 1 &&
                  hrefPaths.length > 1 &&
                  paths[1] === hrefPaths[1]
                }
                className="flex items-center rounded-md px-3 py-2 transition-colors duration-500 hover:bg-muted/50 data-[active=true]:bg-muted"
              >
                {Icon && <Icon className="mr-3 size-4" />}
                {title}
              </Link>
            )
          })}
        </nav>
      </main>
      <footer className="mt-auto flex flex-col items-center gap-2 border-t border-border p-6">
        <div className="flex items-center gap-1.5">
          <span>Acesse o</span>
          <Link
            href={projectRepositoryUrl}
            className={cn(
              buttonVariants({ size: 'none', variant: 'linkSecondary' }),
              'flex items-center gap-2 text-base',
            )}
            target="_blank"
          >
            GitHub <GithubIcon className="fill-foreground" />
          </Link>
        </div>
      </footer>
    </aside>
  )
}
