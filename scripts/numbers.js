const CLOUDFLARE_API = 'https://api.cloudflare.com/client/v4'
const FXTWITTER_API = 'https://api.fxtwitter.com'
const ZONES_PER_PAGE = 50
const ZONES_PER_QUERY = 10
const DAYS_PER_MONTH = 30
const MS_PER_DAY = 24 * 60 * 60 * 1000

const REQUESTS_QUERY = `query ($zoneTags: [string!], $since: Date!, $until: Date!) {
  viewer {
    zones(filter: { zoneTag_in: $zoneTags }) {
      zoneTag
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

const listZones = async ({ fetch, token }) => {
  const zones = []
  for (let page = 1; ; page++) {
    const { result, result_info: info } = await cloudflare({
      fetch,
      token,
      path: `/zones?per_page=${ZONES_PER_PAGE}&page=${page}`
    })
    zones.push(...result.map(({ id, name }) => ({ id, name })))
    if (page >= info.total_pages) return zones
  }
}

const sumRequests = groups => groups.reduce((total, group) => total + group.sum.requests, 0)

export const cloudflareRequestsPerMonthByZone = async ({ fetch, token, now }) => {
  const zones = await listZones({ fetch, token })
  const nameById = new Map(zones.map(zone => [zone.id, zone.name]))
  const range = lastMonthRange(now)
  const results = await Promise.all(
    chunk([...nameById.keys()], ZONES_PER_QUERY).map(async zoneTags => {
      const { data } = await cloudflare({
        fetch,
        token,
        path: '/graphql',
        body: { query: REQUESTS_QUERY, variables: { zoneTags, ...range } }
      })
      return data.viewer.zones.map(zone => [
        nameById.get(zone.zoneTag),
        sumRequests(zone.httpRequests1dGroups)
      ])
    })
  )
  return Object.fromEntries(results.flat())
}

export const xFollowers = async ({ fetch, username }) => {
  const res = await fetch(`${FXTWITTER_API}/${username}`)
  const payload = await res.json()
  const followers = payload.user?.followers
  if (!res.ok || !Number.isInteger(followers)) {
    throw new Error(`FxTwitter ${username}: HTTP ${res.status} ${payload.message ?? ''}`.trim())
  }
  return followers
}
