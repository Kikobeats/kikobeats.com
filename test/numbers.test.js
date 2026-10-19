import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  cloudflareRequestsPerMonth,
  githubStars,
  lastMonthRange,
  npmDownloadsPerMonth
} from '../scripts/numbers.js'
import { npmDownloads } from '../scripts/npm-downloads.js'

const NOW = new Date('2026-10-19T12:00:00Z')

const repos = [{ stars: 10, downloadsLastMonth: 100 }, { stars: 5 }, { downloadsLastMonth: 7 }]

const jsonResponse = (payload, status = 200) => ({ ok: status < 400, json: async () => payload })

const stubCloudflare = ({ zonePages, requestsByZone, graphqlErrors }) => {
  const calls = []
  const fetch = async (url, init) => {
    calls.push({ url, init })
    if (url.includes('/zones?')) {
      const page = Number(new URL(url).searchParams.get('page'))
      return jsonResponse({
        success: true,
        result: zonePages[page - 1].map(id => ({ id })),
        result_info: { total_pages: zonePages.length }
      })
    }
    if (graphqlErrors) return jsonResponse({ data: null, errors: graphqlErrors })
    const { zoneTags } = JSON.parse(init.body).variables
    return jsonResponse({
      data: {
        viewer: {
          zones: zoneTags.map(tag => ({
            httpRequests1dGroups: requestsByZone[tag].map(requests => ({ sum: { requests } }))
          }))
        }
      },
      errors: null
    })
  }
  return { fetch, calls }
}

test('githubStars sums stars and treats missing as zero', () => {
  assert.equal(githubStars(repos), 15)
})

test('npmDownloadsPerMonth sums last-month downloads and treats missing as zero', () => {
  assert.equal(npmDownloadsPerMonth(repos), 107)
})

test('lastMonthRange covers the 30 days before today, today excluded', () => {
  assert.deepEqual(lastMonthRange(NOW), { since: '2026-09-19', until: '2026-10-19' })
})

test('cloudflareRequestsPerMonth sums every zone across pages and query chunks', async () => {
  const zones = Array.from({ length: 12 }, (_, index) => `zone${index}`)
  const requestsByZone = Object.fromEntries(zones.map(zone => [zone, [1, 2]]))
  const { fetch, calls } = stubCloudflare({
    zonePages: [zones.slice(0, 7), zones.slice(7)],
    requestsByZone
  })

  const total = await cloudflareRequestsPerMonth({ fetch, token: 'token', now: NOW })

  assert.equal(total, 36)
  const graphqlCalls = calls.filter(call => call.url.endsWith('/graphql'))
  assert.deepEqual(
    graphqlCalls.map(call => JSON.parse(call.init.body).variables.zoneTags.length),
    [10, 2]
  )
  assert.equal(calls[0].init.headers.authorization, 'Bearer token')
  assert.deepEqual(JSON.parse(graphqlCalls[0].init.body).variables.since, '2026-09-19')
})

test('cloudflareRequestsPerMonth throws on GraphQL errors instead of reporting zero', async () => {
  const { fetch } = stubCloudflare({
    zonePages: [['zone0']],
    graphqlErrors: [{ message: 'not authorized' }]
  })
  await assert.rejects(
    cloudflareRequestsPerMonth({ fetch, token: 'token', now: NOW }),
    /not authorized/
  )
})

const npmStub = handler => {
  const urls = []
  const fetch = async url => {
    urls.push(url)
    return handler(url, urls.length)
  }
  return { fetch, urls }
}

const npmResponse = (status, payload, headers = {}) => ({
  ok: status < 400,
  status,
  headers: new Headers(headers),
  json: async () => payload
})

test('npmDownloads batches unscoped names and fetches scoped names one by one', async () => {
  const unscoped = Array.from({ length: 129 }, (_, index) => `pkg${index}`)
  const { fetch, urls } = npmStub(url => {
    const names = url.split('/').pop()
    if (names.startsWith('%40')) return npmResponse(200, { downloads: 9 })
    if (!names.includes(',')) return npmResponse(200, { downloads: 3 })
    return npmResponse(
      200,
      Object.fromEntries(names.split(',').map(name => [name, { downloads: 1 }]))
    )
  })

  const downloads = await npmDownloads([...unscoped, '@scope/pkg', 'pkg0'], 'last-month', { fetch })

  assert.equal(urls.length, 3)
  assert.equal(urls[0].split('/').pop().split(',').length, 128)
  assert.equal(downloads.get('pkg0'), 1)
  assert.equal(downloads.get('pkg128'), 3)
  assert.equal(downloads.get('@scope/pkg'), 9)
  assert.ok(urls[2].endsWith('/last-month/%40scope%2Fpkg'))
})

test('npmDownloads maps unpublished packages to null', async () => {
  const { fetch } = npmStub(url =>
    url.includes(',') ? npmResponse(200, { a: { downloads: 5 }, b: null }) : npmResponse(404, {})
  )
  const downloads = await npmDownloads(['a', 'b', '@x/y'], 'last-month', { fetch })
  assert.deepEqual(
    [...downloads],
    [
      ['a', 5],
      ['b', null],
      ['@x/y', null]
    ]
  )
})

test('npmDownloads retries rate limits, honoring retry-after', async () => {
  const waits = []
  const { fetch } = npmStub((url, call) =>
    call === 1 ? npmResponse(429, {}, { 'retry-after': '2' }) : npmResponse(200, { downloads: 7 })
  )
  const downloads = await npmDownloads(['a'], 'last-month', {
    fetch,
    wait: async ms => waits.push(ms)
  })
  assert.deepEqual(waits, [2000])
  assert.equal(downloads.get('a'), 7)
})

test('npmDownloads throws after persistent rate limits instead of reporting zero', async () => {
  const { fetch, urls } = npmStub(() => npmResponse(429, {}))
  await assert.rejects(
    npmDownloads(['a'], 'last-month', { fetch, wait: async () => {} }),
    /HTTP 429/
  )
  assert.equal(urls.length, 5)
})
