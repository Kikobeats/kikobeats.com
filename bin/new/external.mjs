#!/usr/bin/env zx

import { writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { question } from 'zx'

import { slug, today } from '../util.mjs'

const url = await question('Enter URL: ')

const title = process.argv[2] ?? await question('Enter title: ')

const { year, month, day } = await question('Enter date (DD-MM-YYYY): [today] ').then(date => {
  if (date === '') return today()
  const [year, month, day] = date.split('-')
  return { year, month, day }
})

const filename = `_posts/${year}-${month}-${day}-${slug(title)}.md`

if (existsSync(filename)) {
  console.error(`\nThe file '${filename}' already exists.`)
  process.exit(1)
}

await writeFile(filename, `
---
sitemap: false
external: ${url}
date: '${year}-${month}-${day}'
title: '${title}'
---
`.trim())

console.log(`\nThe file '${filename}' has been created ✨`)
