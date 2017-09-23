---
layout: post
title: Polyfill, Ponyfill & Prollyfill
image: http://i.imgur.com/2TzbcBE.jpg
date: '2015-06-06 14:52:52'
tags:
- computer-science
---

Commonly we used it, but exists a *subtle* difference. Normally we use it for refer browser, node or javascript features, but I understand that you can extrapolate it for another language or environment.

## Polyfill

A *polyfill* is code that adds missing functionality by monkey patching an API.

Normally, the polyfill implementation is based in provide a full implementation on a feature.

The typical example for that is add new features in old browsers. For example, [Modernizr](http://modernizr.com/) detect browser features and use a set of polyfills for enable browser features in old browsers or are not supported yet.

The problem with this kind of solutions, because they are monkey patching missing API's method, is that they are characterized for pollute the global scope.

## Ponyfill

The *ponyfill* approach is a little more smart: Instead of pollute the global scope, it export the functionality as module.

For example, an example of a [Number.MAX\_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) *ponyfill* could be:

```js
module.exports = 9007199254740991
```

It's important don't use native methods in a ponyfill implementation because this methods could be different behavior depending of the environment.

If you want to use native method, you can wrap it out of the module escope:

```js
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || require('number-max-safe-integer')
```

Recently all information about that are collected in [ponyfill.com](https://ponyfill.com)

## Prollyfill

A polyfill for a not yet standardized API.

It's provide functionalities that could be supported natively in the future, but currently missing in [EMACScript specification](https://people.mozilla.org/~jorendorff/es6-draft.html).

For example, I hope to see `JSON.save` or `JSON.load` as native methods, but currently they are missing. Although you can use [JSON Future](https://github.com/Kikobeats/json-future) prollyfill.