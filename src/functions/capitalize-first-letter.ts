export function capitalizeFirstLetter<T>(value: string) {
  return (value.charAt(0).toUpperCase() + value.slice(1)) as T
}
