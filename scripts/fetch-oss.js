import { Octokit } from '@octokit/rest'
import { writeFile } from 'fs/promises'
import pLimit from 'p-limit'

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

const getNpmDownloads = async (pkgName, period = 'last-year') => {
  try {
    const res = await fetch(
      `https://api.npmjs.org/downloads/point/${period}/${encodeURIComponent(pkgName)}`
    )

    if (!res.ok) return null

    const data = await res.json()
    return data.downloads ?? 0
  } catch {
    return null
  }
}

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

const allRepos = await listUserRepos(GH_USERNAME)

const repos = allRepos.filter(
  repo => GH_ORGANIZATIONS.includes(repo.owner.login) && !repo.fork && !repo.archived
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
        downloads: 0
      }

      const pkg = await getRootPackageName(repo)

      if (pkg) {
        item.npmUrl = `https://www.npmjs.com/package/${pkg.name}`
        const downloads = await getNpmDownloads(pkg.name)
        if (downloads !== null) {
          item.downloads = downloads
        }

        if (pkg.keywords) {
          item.keywords = Array.from(new Set([...(item.keywords || []), ...(pkg.keywords || [])]))
        }
      }

      data.push(item)
    })
  )
)

const sortedData = data.slice().sort((a, b) => {
  if (b.downloads !== a.downloads) {
    return b.downloads - a.downloads // Sort by downloads descending
  }
  return b.stars - a.stars // Then by stars descending
})

await writeFile('_data/oss.json', JSON.stringify(sortedData, null, 2))

console.log(`✔ Written ${data.length} repos to repos.json`)
