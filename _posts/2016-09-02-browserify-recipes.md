---
layout: post
title: Browserify Recipes
image: https://i.imgur.com/Fj3PqJR.jpg
date: '2016-09-02 11:43:46'
tags:
- frontend
---

# Creating `require` module in the browser

```js
var browserify = require('browserify')

browserify()
  .require(src.main, { expose: module.shortcut })
  .bundle()
```

# Creating `global` module in the browser

```js
var browserify = require('browserify')
browserify(src.vanilla, { standalone: module.shortcut })
  .bundle()
```

# Applying transpilers (like CoffeeScript, TypeScript, Babel,...)

```coffee
var browserify = require('browserify')
var coffeeify = require('coffeeify')

browserify extensions: ['.coffee', '.js']
  .transform coffeeify, global: true
  .require(src.main, { expose: module.shortcut })
  .ignore('coffee-script')
  .bundle()
```
