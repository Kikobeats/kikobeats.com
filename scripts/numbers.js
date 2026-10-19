const CLOUDFLARE_API = 'https://api.cloudflare.com/client/v4'
const X_FOLLOWER_SOURCES = [
  { url: 'https://api.fxtwitter.com', followers: payload => payload.user?.followers },
  { url: 'https://api.vxtwitter.com', followers: payload => payload.followers_count }
]
const ZONES_PER_PAGE = 50
const DAYS_PER_MONTH = 30
const MS_PER_DAY = 24 * 60 * 60 * 1000

const REQUESTS_QUERY = `query ($zoneTag: string!, $since: Date!, $until: Date!) {
  viewer {
    zones(filter: { zoneTag: $zoneTag }) {
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

const zoneRequests = async ({ fetch, token, zone, range }) => {
  const { data } = await cloudflare({
    fetch,
    token,
    path: '/graphql',
    body: { query: REQUESTS_QUERY, variables: { zoneTag: zone.id, ...range } }
  })
  return sumRequests(data.viewer.zones.flatMap(({ httpRequests1dGroups }) => httpRequests1dGroups))
}

export const cloudflareRequestsPerMonthByZone = async ({ fetch, token, now }) => {
  const zones = await listZones({ fetch, token })
  const range = lastMonthRange(now)
  const results = await Promise.allSettled(
    zones.map(zone => zoneRequests({ fetch, token, zone, range }))
  )
  const byZone = {}
  const failures = []
  results.forEach((result, index) => {
    const { name } = zones[index]
    if (result.status === 'fulfilled') byZone[name] = result.value
    else failures.push({ zone: name, message: result.reason.message })
  })
  return { byZone, failures }
}

const followersFrom = async ({ fetch, username, source }) => {
  const res = await fetch(`${source.url}/${username}`)
  const payload = await res.json().catch(() => ({}))
  const followers = source.followers(payload)
  if (!res.ok || !Number.isInteger(followers)) {
    throw new Error(`${source.url}/${username}: HTTP ${res.status} ${payload.message ?? ''}`.trim())
  }
  return followers
}

export const xFollowers = async ({ fetch, username }) => {
  const errors = []
  for (const source of X_FOLLOWER_SOURCES) {
    try {
      return await followersFrom({ fetch, username, source })
    } catch (error) {
      errors.push(error.message)
    }
  }
  throw new Error(errors.join('; '))
}
