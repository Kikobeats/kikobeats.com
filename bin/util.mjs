export const slug = (str) => str.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '')

export const today = () => {
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, '0')
  const day = String(new Date().getDate()).padStart(2, '0')
  return { month, year, day}
}
