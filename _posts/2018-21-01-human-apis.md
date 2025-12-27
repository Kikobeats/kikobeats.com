---
layout: post
title: Human APIs
date: '2018-01-21'
image: images/human-apis/header.jpeg
---

## Title

I tend to format my styles. Although you can do that following different criteria, my main criteria is aesthetic.

I created [microsoft-capitalize](https://github.com/kikobeats/microsoft-capitalize) just for that:

```js
const capitalize = require('microsoft-capitalize')

capitalize('Microlink CDN: Global Edge Cache')
// => 'Microlink CDN: Global edge cache'
```

It follows [Microsoft Copywriting styleguide](https://docs.microsoft.com/en-us/style-guide/capitalization), which is simple and intuitive.

## Date

Internationalization is difficult to get right at the best of times, luckily there is a [well supported](https://caniuse.com/#feat=internationalization) API for it now in most browsers.

The method [toLocaleString()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/ToLocaleString) will format the current `Number`/`Date`/`Object` state into an international string locale representation.

```js
const formatDate = ((date = new Date()),
({ lang = 'en-us', month = 'short', day = 'numeric', year = 'numeric' } = {}) =>
  new Date(date).toLocaleString(lang, { month, day, year }))
```

There is another way to format dates, using [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat). It's specially useful for converting a timestamp to a specific timezone:

```js
const prettyDate = timestamp =>
  `[${new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Europe/Madrid', // this is my local timezone!
    hour12: false
  }).format(new Date(timestamp))}]`
```

## Number

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

You can use the browser for getting the user language preference:

```js
const locale = navigator.language || navigator.userLanguage || 'en-US'
```

That's could be a good point to start. Next step could remember the user preference and store it associated with the user profile settings.

### Alternatives

- [human-number](https://github.com/Kikobeats/human-number) – Convert number to a human readable string.

## Bytes

The [Intl.NumberFormat]() is an specific API for sensitive number formatting.

It can be used for formatting bytes:

```js
const prettyBytes = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  style: 'unit',
  unit: 'byte',
  unitDisplay: 'narrow',
});

prettyBytes.format(1024) // 1KB
```

Unfortunately, it isn't converting between units so you will need to write some code around. 

See the [list of supported units](https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier).

### Alternatives

- [pretty-bytes](https://github.com/sindresorhus/pretty-bytes) – Convert bytes to a human readable string.

## Relative Time

The [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat) makes easy to formate relative time.

```js
const formatTime = (
  date1 = new Date(),
  date2 = new Date(),
  { lang = 'en-us', unit = 'seconds', ...opts } = {}
) => new Intl.RelativeTimeFormat(lang, opts).format(date2 - date1, unit)
```

### Alternatives

- [twas](https://github.com/sebastiansandqvist/s-ago) – Smallest relative time string function.
- [timeago.js](https://github.com/hustcc/timeago.js) Relative time formatter with localization support.

## List

```js
const listFormat = (list, { lang = 'en-us', ...opts } = {}) => new Intl.ListFormat(lang, opts).format(list)

listFormat(['Paco']) // "Paco"
listFormat(['Paco', 'Pepe']) // "Paco and Pepe"
listFormat(['Paco', 'Pepe']) // "Paco and Pepe"
listFormat(['Paco', 'Pepe'], { type: 'disjunction' }) // "Paco or Pepe"
```

### Alternatives

- [humanize-list](https://github.com/johno/humanize-list) – Comma delimit an array for human readability.

## Cache Header

Setting a `Cache-Control` header can be tricky to remember. [pretty-cache-header](https://github.com/jjenzz/pretty-cache-header) makes it more human-readable:

```js
const cacheHeader = require('pretty-cache-header')

cacheHeader({
  public: true,
  maxAge: '1 day',
  staleWhileRevalidate: '1 week'
})
// => 'public, max-age=86400, stale-while-revalidate=604800'
```

## Bibliography

- [JS things I never knew existed](http://air.ghost.io/js-things-i-never-knew-existed/)
- [Intl on MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
