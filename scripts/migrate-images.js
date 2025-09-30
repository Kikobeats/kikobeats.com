'use strict'

const { mkdir, readdir, readFile, writeFile } = require('fs/promises')
const contentType = require('@kikobeats/content-type')
const debug = require('debug-logfmt')('jekyll')
const GithubSlugger = require('github-slugger')
const unidecode = require('unidecode')
const matter = require('gray-matter')
const sharp = require('sharp')
const mime = require('mime')
const path = require('path')

const got = require('got').extend({
  timeout: 8000,
  responseType: 'buffer'
})

const isHttpUrl = input => input.startsWith('http')

const mkdirp = filepath => mkdir(filepath).catch(() => {})

const allPosts = async () =>
  (await readdir(path.resolve(__dirname, '../_posts'))).map(post => path.resolve('_posts', post))

const imageUrl = (url, opts) =>
  `https://images.weserv.nl/?${new URLSearchParams({
    url,
    default: url,
    l: 9,
    af: '',
    il: '',
    n: -1,
    ...opts
  }).toString()}`

const staticImage = async (url, destination) => {
  try {
    debug('fetching', url)
    const { body: buffer, headers } = await got(imageUrl(url))
    const extension = mime.getExtension(contentType(headers['content-type']))
    const filepath = `${destination}.${extension}`

    await sharp(buffer)
      .png({ lossless: true, compressionLevel: 9 })
      .jpeg({ quality: 80, progressive: true, compressionLevel: 6 })
      .toFile(filepath)

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

    const imagesFolder = path.join('images', slugger.slug(unidecode(data.title)))
    await mkdirp(imagesFolder)

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

    /**
     * It detects markdown image URLs like `![alt](url)`
     */
    const regex = () => /!\[(.*?)\]\((.*?)\)/gm

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
