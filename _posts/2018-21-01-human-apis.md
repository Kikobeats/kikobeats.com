---
layout: post
title: Human APIs
date: '2018-01-21'
image: https://i.imgur.com/TTS0TFn.jpg
tags:
- javascript
---

## Title Format

I tend to format my styles. Although you can do that following different criteria, my main criteria is aesthetic

I found [`title`](https://github.com/zeit/title) very useful for that:

```js
const title = require('title')

title('noW deSktop and now cLI are prODUCts of zeIt')

// Will result in:
// "Now Desktop and Now CLI Are Products of ZEIT"
```

In addition, I created a [alfred-title](https://github.com/Kikobeats/alfred-title) for create format titles on the fly using [Alfred](https://www.alfredapp.com/)

![](https://github.com/Kikobeats/alfred-title/raw/master/demo.gif)

### Alternatives

- [titleize](https://github.com/sindresorhus/titleize) – Capitalize every word in a string.
- [humanize-string](https://github.com/sindresorhus/humanize-string) – Convert a camelized/dasherized/underscored string into a humanized one.

## Date Format

Internationalization is difficult to get right at the best of times, luckily there is a [well supported](https://caniuse.com/#feat=internationalization) API for it now in most browsers.

The method [`Object.prototype.toLocaleString()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/ToLocaleString) will format the current `Number`/`Date`/`Object` state into an international string locale representation.

```js
const formatDate = ((date = new Date()),
({ lang = 'en-us', month = 'short', day = 'numeric', year = 'numeric' } = {}) =>
  new Date(date).toLocaleString(lang, { month, day, year }))
```

Using it on action

```js
formatDate() // 'Dec 6, 2018'
formatDate(new Date()) // 'Dec 6, 2018'
```

### Alternatives

- [tinydate](https://www.npmjs.com/package/tinydate) – A tiny date formatter based on a pattern.
- [ms](https://www.npmjs.com/package/ms) – Use this package to easily convert various time formats to milliseconds.
- [pretty-ms](https://www.npmjs.com/package/pretty-ms) – Convert milliseconds to a human readable string.

## Relative Time Format

The new [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) API introduces [`.RelativeTimeFormat`](https://github.com/tc39/proposal-intl-relative-time) for formatting time.

```js
const formatTime = (
  date1 = new Date(),
  date2 = new Date(),
  { lang = 'en-us', unit = 'seconds', ...opts } = {}
) => new Intl.RelativeTimeFormat(lang, opts).format(date2 - date1, unit)
```

Although it looks promising, still it's an early stage. 

```js
formatTime() // "in 0 seconds"
formatTime(new Date('December 17, 1995 03:24:00'), new Date('December 17, 1995 03:24:00')) // "in 0 seconds"
formatTime(new Date('December 17, 1995 03:24:00'), new Date('December 18, 1995 03:24:00')) // "in 86,400,000 seconds"
formatTime(new Date('December 17, 1995 03:24:00'), new Date('December 18, 1995 03:24:00'), { unit: 'days' }) // "in 86,400,000 days, WTF"
```

Unfortunatly, it hasn't been designed for calculating time difference.

### Alternatives

- [twas](https://github.com/sebastiansandqvist/s-ago) – Smallest relative time string function.
- [timeago.js](https://github.com/hustcc/timeago.js) Relative time formatter with localization support.

## Number Format

The same approach could be used for format a `Number`:

```js
const formatNumber = ({ style = 'currency', currency = 'CAD' } = {}) => (
  n,
  lang = 'en-US'
) => n.toLocaleString('de-DE', { style, currency })
```

Using it on action

```js
const formatter = formatNumber()
const amount = 1034532

formatter(1034532) // 🇺🇸 USA
formatter(1034532, 'de-DE') // 🇩🇪 Germany
formatter(1034532, 'ar-EG') // 🇺🇪🇬 Egypt
```

### How to Choose language

You can use the browser for getting the user language preference

```js
const locale = navigator.language || navigator.userLanguage || 'en-US'
```

That's could be a good point to start. Next step could remember the user preference and store it associated with the user profile settings.

### Alternatives

- [human-number](https://github.com/Kikobeats/human-number) – Convert number to a human readable string.
- [pretty-bytes](https://github.com/sindresorhus/pretty-bytes) – Convert bytes to a human readable string.

## List Format

```js
const listFormat = (list, { lang = 'en-us', ...opts } = {}) => new Intl.ListFormat(lang, opts).format(list)

listFormat(['Paco']) // "Paco"
listFormat(['Paco', 'Pepe']) // "Paco and Pepe"
listFormat(['Paco', 'Pepe']) // "Paco and Pepe"
listFormat(['Paco', 'Pepe'], { type: 'disjunction' }) // "Paco or Pepe"
```

### Alternatives

- [humanize-list](https://github.com/johno/humanize-list) – Comma delimit an array for human readability.

## Bibliography

- [JS things I never knew existed](http://air.ghost.io/js-things-i-never-knew-existed/)
- [Intl on MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
