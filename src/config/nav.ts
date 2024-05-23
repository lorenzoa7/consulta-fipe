import { PackageSearchIcon, Settings2Icon } from 'lucide-react'
import { siteRoutes } from './site'

export type NavItem = {
  title: string
  href: string
  icon?: React.ElementType
}

export const navConfig: NavItem[] = [
  {
    title: 'Consultar valor',
    href: siteRoutes.consultarValor,
    icon: PackageSearchIcon,
  },
  {
    title: 'Configurações',
    href: siteRoutes.configuracoes,
    icon: Settings2Icon,
  },
]
