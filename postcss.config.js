module.exports = {
  plugins: [
    require('postcss-focus'),
    require('cssnano')({
      preset: require('cssnano-preset-advanced')({
        // The #liquidGlass fragment sits outside the SVG, so SVGO treats the filter as unused and deletes it.
        svgo: false
      })
    })
  ]
}
