'use strict'

const condenseWhitespace = require('condense-whitespace')
const browserSync = require('browser-sync').create()
const {spawn} = require('child_process')
const gutil = require('gulp-util')
const gulp = require('gulp')

const log = require('acho')({
  outputType: type => `[${type}]`,
  keyword: 'jekyll'
})

gulp.task('jekyll', () => {
  const jekyll = spawn('bundle', [
    'exec',
    'jekyll',
    'serve',
    '--watch',
    '--incremental',
    '--drafts'
  ])

  const logMessage = type => buffer => {
    buffer
      .toString()
      .split(/\n/)
      .forEach(message => {
        message.length > 2 && log[type](condenseWhitespace(message))
      })
  }
  
  ;[
    {output: 'stdout', type: 'info'},
    {output: 'stderr', type: 'error'}
  ].forEach(({output, type}) => jekyll[output].on('data', logMessage(type)))
})

gulp.task('serve', () => {
  browserSync.init({
    port: 4000,
    open: false,
    reloadDebounce: 2000,
    reloadDelay: 3000,
    ghostMode: false,
    server: {
      baseDir: '_site'
    }
  })
  
  gulp.watch([
    '_site/**/*.*',
  ]).on('change', browserSync.reload);
})

gulp.task('default', ['jekyll', 'serve'])
