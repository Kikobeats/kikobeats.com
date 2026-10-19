import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  cloudflareRequestsPerMonthByZone,
  githubStars,
  lastMonthRange,
  npmDownloadsPerMonth,
  xFollowers
} from '../scripts/numbers.js'
import { npmDownloads } from '../scripts/npm-downloads.js'

const NOW = new Date('2026-10-19T12:00:00Z')

const repos = [{ stars: 10, downloadsLastMonth: 100 }, { stars: 5 }, { downloadsLastMonth: 7 }]

const jsonResponse = (payload, status = 200) => ({
  ok: status < 400,
  status,
  json: async () => payload
})

const stubCloudflare = ({ zonePages, requestsByZone, unauthorized = [] }) => {
  const calls = []
  const fetch = async (url, init) => {
    calls.push({ url, init })
    if (url.includes('/zones?')) {
      const page = Number(new URL(url).searchParams.get('page'))
      return jsonResponse({
        success: true,
        result: zonePages[page - 1].map(id => ({ id, name: `${id}.com` })),
        result_info: { total_pages: zonePages.length }
      })
    }
    const { zoneTag } = JSON.parse(init.body).variables
    if (unauthorized.includes(zoneTag)) {
      return jsonResponse({
        data: null,
        errors: [{ message: `zones [${zoneTag}] are not authorized` }]
      })
    }
    return jsonResponse({
      data: {
        viewer: {
          zones: [
            {
              httpRequests1dGroups: requestsByZone[zoneTag].map(requests => ({ sum: { requests } }))
            }
          ]
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

test('cloudflareRequestsPerMonthByZone sums the last 30 days per zone name across pages', async () => {
  const zones = ['zone0', 'zone1', 'zone2']
  const { fetch, calls } = stubCloudflare({
    zonePages: [['zone0', 'zone1'], ['zone2']],
    requestsByZone: { zone0: [1, 2], zone1: [10], zone2: [] }
  })

  const { byZone, failures } = await cloudflareRequestsPerMonthByZone({
    fetch,
    token: 'token',
    now: NOW
  })

  assert.deepEqual(byZone, { 'zone0.com': 3, 'zone1.com': 10, 'zone2.com': 0 })
  assert.deepEqual(failures, [])
  const graphqlCalls = calls.filter(call => call.url.endsWith('/graphql'))
  assert.equal(graphqlCalls.length, zones.length)
  assert.equal(calls[0].init.headers.authorization, 'Bearer token')
  assert.deepEqual(JSON.parse(graphqlCalls[0].init.body).variables, {
    zoneTag: 'zone0',
    since: '2026-09-19',
    until: '2026-10-19'
  })
})

test('cloudflareRequestsPerMonthByZone keeps authorized zones when others are refused', async () => {
  const { fetch } = stubCloudflare({
    zonePages: [['zone0', 'zone1']],
    requestsByZone: { zone0: [5] },
    unauthorized: ['zone1']
  })

  const { byZone, failures } = await cloudflareRequestsPerMonthByZone({
    fetch,
    token: 'token',
    now: NOW
  })

  assert.deepEqual(byZone, { 'zone0.com': 5 })
  assert.equal(failures.length, 1)
  assert.equal(failures[0].zone, 'zone1.com')
  assert.match(failures[0].message, /not authorized/)
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

test('xFollowers reads the follower count from FxTwitter', async () => {
  const urls = []
  const fetch = async url => {
    urls.push(url)
    return jsonResponse({ code: 200, user: { followers: 4132 } })
  }
  assert.equal(await xFollowers({ fetch, username: 'kikobeats' }), 4132)
  assert.deepEqual(urls, ['https://api.fxtwitter.com/kikobeats'])
})

test('xFollowers falls back to VxTwitter when FxTwitter fails', async () => {
  const fetch = async url =>
    url.startsWith('https://api.fxtwitter.com')
      ? jsonResponse({ code: 404, message: 'User not found' }, 404)
      : jsonResponse({ followers_count: 4132 })
  assert.equal(await xFollowers({ fetch, username: 'kikobeats' }), 4132)
})

test('xFollowers throws when every source fails instead of reporting zero', async () => {
  const fetch = async () => jsonResponse({ message: 'User not found' }, 404)
  await assert.rejects(
    xFollowers({ fetch, username: 'nobody' }),
    /fxtwitter.*HTTP 404 User not found; .*vxtwitter.*HTTP 404/
  )
})
