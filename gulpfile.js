'use strict'

const condenseWhitespace = require('condense-whitespace')
const browserSync = require('browser-sync').create()
const { spawn } = require('child_process')
const gulp = require('gulp')

const log = require('acho')({
  outputType: type => '[jekyll]'
})

const toLog = type => buffer => {
  buffer
    .toString()
    .split(/\n/)
    .forEach(message => {
      message.length > 2 && log[type](condenseWhitespace(message))
    })
}

const jekyll = () => {
  const jekyll = spawn('bundle', [
    'exec',
    'jekyll',
    'serve',
    '--watch',
    '--incremental',
    '--drafts'
  ])

  ;[{ output: 'stdout', type: 'info' }, { output: 'stderr', type: 'error' }].forEach(
    ({ output, type }) => jekyll[output].on('data', toLog(type))
  )
}

const serve = () => {
  browserSync.init({
    port: 1337,
    server: {
      baseDir: '_site'
    }
  })
}

function reload (done) {
  browserSync.reload()
  done()
}

const watchFiles = () => gulp.watch(['!_site/.sass-cache', '_site/**/*.*']).on('change', reload)

const watch = gulp.parallel([watchFiles])

const devServer = gulp.parallel([jekyll, serve])

exports.serve = serve
exports.jekyll = jekyll
exports.watch = watch
exports.default = gulp.series([devServer, watch])
