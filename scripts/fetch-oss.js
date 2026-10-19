import { Octokit } from '@octokit/rest'
import { writeFile } from 'fs/promises'
import pLimit from 'p-limit'
import { npmDownloads } from './npm-downloads.js'

const octokit = new Octokit({ auth: process.env.GH_TOKEN })
const limit = pLimit(5) // safe for GitHub + npm

const GH_USERNAME = 'Kikobeats'
const GH_ORGANIZATIONS = [GH_USERNAME, 'microlinkhq', 'teslahunt', 'urlint', 'achojs']

const listUserRepos = username =>
  octokit.paginate(octokit.rest.repos.listForUser, {
    username,
    per_page: 100,
    type: 'all'
  })

const getRootPackageName = async repo => {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: repo.owner.login,
      repo: repo.name,
      path: 'package.json'
    })

    if (!data?.content) return null

    const pkg = JSON.parse(Buffer.from(data.content, 'base64').toString())
    return pkg
  } catch {
    return null
  }
}

const allRepos = (await Promise.all(GH_ORGANIZATIONS.map(listUserRepos))).flat()

const repos = Array.from(
  new Map(
    allRepos
      .filter(repo => GH_ORGANIZATIONS.includes(repo.owner.login) && !repo.fork && !repo.archived)
      .map(repo => [repo.full_name, repo])
  ).values()
)

const data = []

await Promise.all(
  repos.map(repo =>
    limit(async () => {
      // console.log(repo)
      const item = {
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        license: {
          spdx: repo.license?.spdx_id,
          url: repo.license?.url
        },
        githubUrl: repo.html_url,
        stars: repo.stargazers_count,
        keywords: repo.topics,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        npmUrl: null,
        npmName: null
      }

      const pkg = await getRootPackageName(repo)

      if (pkg) {
        item.npmUrl = `https://www.npmjs.com/package/${pkg.name}`
        item.npmName = pkg.name

        if (pkg.keywords) {
          item.keywords = Array.from(new Set([...(item.keywords || []), ...(pkg.keywords || [])]))
        }
      }

      data.push(item)
    })
  )
)

const npmNames = data.map(item => item.npmName).filter(Boolean)
const yearly = await npmDownloads(npmNames, 'last-year')
const monthly = await npmDownloads(npmNames, 'last-month')

const sortedData = data
  .map(({ npmName, ...item }) => ({
    ...item,
    downloads: yearly.get(npmName) ?? 0,
    downloadsLastMonth: monthly.get(npmName) ?? 0
  }))
  .sort((a, b) => {
    if (b.downloads !== a.downloads) {
      return b.downloads - a.downloads // Sort by downloads descending
    }
    return b.stars - a.stars // Then by stars descending
  })

await writeFile('_data/oss.json', JSON.stringify(sortedData, null, 2))

console.log(`✔ Written ${data.length} repos to repos.json`)
