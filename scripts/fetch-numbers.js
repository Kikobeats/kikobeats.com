import { readFile, writeFile } from 'fs/promises'
import {
  cloudflareRequestsPerMonthByZone,
  githubStars,
  npmDownloadsPerMonth,
  xFollowers
} from './numbers.js'

const X_USERNAME = 'kikobeats'

const repos = JSON.parse(await readFile('_data/oss.json', 'utf8'))
const token = process.env.CLOUDFLARE_API_TOKEN

const optional = async (label, compute, fallback) => {
  try {
    return await compute()
  } catch (error) {
    console.warn(`⚠ ${label} unavailable: ${error.message}`)
    return fallback
  }
}

const requestsPerMonth = () => {
  if (token) return cloudflareRequestsPerMonthByZone({ fetch, token })
  console.warn('⚠ CLOUDFLARE_API_TOKEN is unset, skipping Cloudflare requests')
  return {}
}

const numbers = {
  githubStars: githubStars(repos),
  npmDownloadsPerMonth: npmDownloadsPerMonth(repos),
  xFollowers: await optional(
    'X followers',
    () => xFollowers({ fetch, username: X_USERNAME }),
    null
  ),
  requestsPerMonth: await optional('Cloudflare requests', requestsPerMonth, {})
}

await writeFile('_data/numbers.json', JSON.stringify(numbers, null, 2))

console.log(`✔ Written numbers ${JSON.stringify(numbers)}`)
