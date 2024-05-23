import { capitalizeFirstLetter } from './capitalize-first-letter'

export function formatPathname(value: string) {
  return capitalizeFirstLetter<string>(
    value.replace(/^\//, '').replace(/-/g, ' '),
  )
}
