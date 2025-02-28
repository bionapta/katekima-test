export const extractIdFromUrl = (url: string): string => {
  const parts = url.split('/')
  return parts[parts.length - 2]
}

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
