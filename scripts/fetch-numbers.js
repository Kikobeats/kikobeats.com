import { readFile, writeFile } from 'fs/promises'
import { cloudflareRequestsPerMonth, githubStars, npmDownloadsPerMonth } from './numbers.js'

const repos = JSON.parse(await readFile('_data/oss.json', 'utf8'))
const token = process.env.CLOUDFLARE_API_TOKEN

const cloudflareRequests = async () => {
  if (!token) {
    console.warn('⚠ CLOUDFLARE_API_TOKEN is unset, skipping Cloudflare requests')
    return null
  }
  try {
    return await cloudflareRequestsPerMonth({ fetch, token })
  } catch (error) {
    console.warn(`⚠ Cloudflare requests unavailable: ${error.message}`)
    return null
  }
}

const numbers = {
  githubStars: githubStars(repos),
  npmDownloadsPerMonth: npmDownloadsPerMonth(repos),
  cloudflareRequestsPerMonth: await cloudflareRequests()
}

await writeFile('_data/numbers.json', JSON.stringify(numbers, null, 2))

console.log(`✔ Written numbers ${JSON.stringify(numbers)}`)
