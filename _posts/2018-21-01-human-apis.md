---
layout: post
title: Human APIs
date: '2018-01-21'
image: https://i.imgur.com/TTS0TFn.jpg
tags:
- javascript
---

## Date Format

Internationalization is difficult to get right at the best of times, luckily there is a [well supported](https://caniuse.com/#feat=internationalization) API for it now in most browsers.

The method [`Object.prototype.toLocaleString()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/ToLocaleString) will format the current `Number`/`Date`/`Object` state into an international string locale representation.

```js
const formatDate = ({
  month = 'short',
  day = 'numeric',
  year = 'numeric'
} = {}) => (timestamp = new Date(), lang = 'en-us') =>
  new Date(timestamp).toLocaleString(lang, { month, day, year })
```

Using it on action

```js
const formattter = formatDate()
formatter() // 'Dec 6, 2018'
```

## Relative Time Format

The new [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) API introduces [`.RelativeTimeFormat`](https://github.com/tc39/proposal-intl-relative-time) for formatting time.

```js
const rtf = new Intl.RelativeTimeFormat('en')

rtf.format(3.14, 'second')
// → 'in 3.14 seconds'

rtf.format(-15, 'minute')
// → '15 minutes ago'
```

Although it looks promising, still it's an early stage. Alternatively, you can use [ms](https://www.npmjs.com/package/ms) or [pretty-ms](https://www.npmjs.com/package/pretty-ms) packages.

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

## How to Choose language

You can use the browser for getting the user language preference

```js
const locale = navigator.language || navigator.userLanguage || 'en-US'
```

That's could be a good point to start. Next step could remember the user preference and store it associated with the user profile settings.

## Bibliography

- [JS things I never knew existed](http://air.ghost.io/js-things-i-never-knew-existed/)
- [Intl on MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
