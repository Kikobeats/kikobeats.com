const CLOUDFLARE_API = 'https://api.cloudflare.com/client/v4'
const ZONES_PER_PAGE = 50
const ZONES_PER_QUERY = 10
const DAYS_PER_MONTH = 30
const MS_PER_DAY = 24 * 60 * 60 * 1000

const REQUESTS_QUERY = `query ($zoneTags: [string!], $since: Date!, $until: Date!) {
  viewer {
    zones(filter: { zoneTag_in: $zoneTags }) {
      httpRequests1dGroups(limit: ${
        DAYS_PER_MONTH + 1
      }, filter: { date_geq: $since, date_lt: $until }) {
        sum { requests }
      }
    }
  }
}`

const sumBy = (items, key) => items.reduce((total, item) => total + (item[key] || 0), 0)

export const githubStars = repos => sumBy(repos, 'stars')

export const npmDownloadsPerMonth = repos => sumBy(repos, 'downloadsLastMonth')

const toDate = date => date.toISOString().slice(0, 10)

export const lastMonthRange = (now = new Date()) => ({
  since: toDate(new Date(now.getTime() - DAYS_PER_MONTH * MS_PER_DAY)),
  until: toDate(now)
})

const chunk = (items, size) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, (index + 1) * size)
  )

const cloudflare = async ({ fetch, token, path, body }) => {
  const res = await fetch(`${CLOUDFLARE_API}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: body && JSON.stringify(body)
  })
  const payload = await res.json()
  if (!res.ok || payload.success === false || payload.errors?.length) {
    throw new Error(`Cloudflare ${path}: ${JSON.stringify(payload.errors)}`)
  }
  return payload
}

const listZoneTags = async ({ fetch, token }) => {
  const tags = []
  for (let page = 1; ; page++) {
    const { result, result_info: info } = await cloudflare({
      fetch,
      token,
      path: `/zones?per_page=${ZONES_PER_PAGE}&page=${page}`
    })
    tags.push(...result.map(zone => zone.id))
    if (page >= info.total_pages) return tags
  }
}

export const cloudflareRequestsPerMonth = async ({ fetch, token, now }) => {
  const zoneTags = await listZoneTags({ fetch, token })
  const range = lastMonthRange(now)
  const totals = await Promise.all(
    chunk(zoneTags, ZONES_PER_QUERY).map(async zoneTagsChunk => {
      const { data } = await cloudflare({
        fetch,
        token,
        path: '/graphql',
        body: { query: REQUESTS_QUERY, variables: { zoneTags: zoneTagsChunk, ...range } }
      })
      return data.viewer.zones
        .flatMap(zone => zone.httpRequests1dGroups)
        .reduce((total, group) => total + group.sum.requests, 0)
    })
  )
  return totals.reduce((total, requests) => total + requests, 0)
}
