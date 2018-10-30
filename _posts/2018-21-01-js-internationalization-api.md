---
layout: post
title: JavaScript Internationalization
date: '2018-01-21'
image: https://i.imgur.com/TTS0TFn.jpg
tags:
- javascript
---

Internationalization is difficult to get right at the best of times, luckily there is a [well supported](https://caniuse.com/#feat=internationalization) API for it now in most browsers.

<blockquote class="twitter-tweet" data-lang="es"><p lang="en" dir="ltr">Tip: Format dates with ease<br><br>(new Date()).toLocaleString(&#39;en-us&#39;, {month: &#39;long&#39;, day: &#39;numeric&#39;, year: &#39;numeric&#39;});<br>//=&gt; August 17, 2016</p>&mdash; Sindre Sorhus 🇳🇴 (@sindresorhus) <a href="https://twitter.com/sindresorhus/status/783366849954213888?ref_src=twsrc%5Etfw">4 de octubre de 2016</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Using .toLocaleString() method

The method [Object.prototype.toLocaleString()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/ToLocaleString) will format the current `Number`/`Date`/`Object` state into an international string locale representation.


First time I used it was on [windtoday](https://windtoday.co) app, where I created a helper for easily format a timestamp based on a locale

```js
const getFormatDate = (timestamp, lang = 'en-us') =>
  new Date(timestamp).toLocaleString(lang, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
```

In an international scenario a good approach could be get the language from the browser settings:

```js
const locale = navigator.language || navigator.userLanguage
```

It's useful for formatting money as well:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">🔥 You can format currency with .toLocaleString() <a href="https://t.co/Dagiw1QcNM">pic.twitter.com/Dagiw1QcNM</a></p>&mdash; Wes Bos 🔥 (@wesbos) <a href="https://twitter.com/wesbos/status/750423643323297792?ref_src=twsrc%5Etfw">July 5, 2016</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Bibliography

- [JS things I never knew existed](http://air.ghost.io/js-things-i-never-knew-existed/)
- [Intl on MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)