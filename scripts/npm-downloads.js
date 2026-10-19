const NPM_DOWNLOADS_API = 'https://api.npmjs.org/downloads/point'
const BULK_LIMIT = 128
const MAX_ATTEMPTS = 5
const BASE_DELAY_MS = 1000
const HTTP_NOT_FOUND = 404
const HTTP_TOO_MANY_REQUESTS = 429
const HTTP_SERVER_ERROR = 500

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const isRetryable = status => status === HTTP_TOO_MANY_REQUESTS || status >= HTTP_SERVER_ERROR

const retryDelay = (res, attempt) => {
  const seconds = Number(res.headers?.get?.('retry-after'))
  return Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : BASE_DELAY_MS * 2 ** attempt
}

const getJson = async ({ fetch, wait, url }) => {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url)
    if (res.ok) return res.json()
    if (res.status === HTTP_NOT_FOUND) return null
    if (!isRetryable(res.status) || attempt === MAX_ATTEMPTS - 1) {
      throw new Error(`npm downloads ${url}: HTTP ${res.status}`)
    }
    await wait(retryDelay(res, attempt))
  }
}

const chunk = (items, size) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, (index + 1) * size)
  )

const fetchOne = async ({ name, ...options }) => {
  const body = await getJson({ ...options, url: `${options.base}/${encodeURIComponent(name)}` })
  return [[name, body?.downloads ?? null]]
}

const fetchBulk = async ({ names, ...options }) => {
  const body = await getJson({ ...options, url: `${options.base}/${names.join(',')}` })
  return names.map(name => [name, body?.[name]?.downloads ?? null])
}

export const npmDownloads = async (
  names,
  period,
  { fetch = globalThis.fetch, wait = sleep } = {}
) => {
  const options = { fetch, wait, base: `${NPM_DOWNLOADS_API}/${period}` }
  const unique = [...new Set(names)]
  const scoped = unique.filter(name => name.startsWith('@'))
  const unscoped = unique.filter(name => !name.startsWith('@'))

  const requests = [
    ...chunk(unscoped, BULK_LIMIT).map(batch =>
      batch.length === 1 ? { name: batch[0] } : { names: batch }
    ),
    ...scoped.map(name => ({ name }))
  ]

  const entries = []
  for (const request of requests) {
    entries.push(...(await (request.names ? fetchBulk : fetchOne)({ ...options, ...request })))
  }
  return new Map(entries)
}
