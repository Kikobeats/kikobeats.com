'use strict'

const { mkdir, readdir, readFile, writeFile } = require('fs/promises')
const debug = require('debug-logfmt')('jekyll')
const GithubSlugger = require('github-slugger')
const matter = require('gray-matter')
const mime = require('mime')
const path = require('path')
const got = require('got')

const isHttpUrl = input => input.startsWith('http')

const allPosts = async () =>
  (await readdir(path.resolve(__dirname, '../_posts'))).map(post => path.resolve('_posts', post))

const staticImage = async (url, destination) => {
  try {
    debug('fetching', url)
    const { body: buffer, headers } = await got(url, { timeout: 8000, responseType: 'buffer' })
    const extension = mime.getExtension(headers['content-type'])
    const filepath = `${destination}.${extension}`
    await writeFile(filepath, buffer)
    debug('fetched', url, '→', filepath)
    return `/${filepath}`
  } catch (err) {
    debug.error('failed to fetch', url)
    throw err
  }
}

const input = process.argv[2] ? [process.argv[2]] : allPosts()

Promise.resolve(input).then(async posts => {
  debug.info(`Retrieved ${posts.length} posts`)
  for (const filepath of posts) {
    const slugger = new GithubSlugger()
    const file = await readFile(filepath)
    let { content, data } = matter(file)

    const imagesFolder = path.join('images', slugger.slug(data.title))
    await mkdir(imagesFolder).catch(() => {})

    const save = () => writeFile(filepath, matter.stringify(content, data))

    if (data.image) {
      if (isHttpUrl(data.image)) {
        const imagepath = await staticImage(data.image, path.join(imagesFolder, 'header'))
        data.image = imagepath
        await save()
      }
    } else {
      debug.warn('No post header image!', filepath)
    }

    const regex = () => /\!\[(.*?)\]\((.*?)\)/gm

    if (regex().test(content)) {
      const re = regex()
      let matches
      while ((matches = re.exec(content)) !== null) {
        const imageUrl = matches[2]
        if (isHttpUrl(imageUrl)) {
          const filename = slugger.slug(new URL(imageUrl).pathname.substring(1).split('.')[0])
          const imagepath = await staticImage(imageUrl, path.join(imagesFolder, filename))
          content = content.replace(imageUrl, imagepath)
        }
      }
      await save()
    }
  }
})
