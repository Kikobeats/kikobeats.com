---
layout: post
title: The best `Cache-Control` strategy
date: '2021-03-31'
image: /images/the-best-cache-control-strategy/header.jpeg
---

A wild tweet from appeared on my timeline:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">What&#39;s faster than a static HTML file?<br><br>An HTML page with `Cache-Control: public, max-age=60`. Browsers can use a local cache instead of requesting the page again.<br><br>But &quot;instant cache invalidation&quot; (jamstack &quot;best practice&quot;) makes it impossible to cache HTML. So it&#39;s slower.</p>&mdash; MICHAEL JACKSON (@mjackson) <a href="https://twitter.com/mjackson/status/1376588198118232066?ref_src=twsrc%5Etfw">March 29, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I can see the [@mjackson](https://twitter.com/mjackson)'s point there: A local cache copy is better than nothing, and caching it for a while (in this case, one minute) is okay for most static web assets scenarios.

However, what happens when your content tends to change, even if it is done in an infrequent way?

In that case, the strategy could be complemented very well [must-revalidate](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#revalidation_and_reloading):


```bash
Cache-Control: max-age=60, stale-while-revalidate=0
```

In that way, the cached copy will always be used _while_ the data is being validated in the background, saving the user to be faced with a cache _MISS_ and refreshing the cache copy as soon as possible.

## Bibliography

* [Keeping things fresh with stale-while-revalidate](https://web.dev/stale-while-revalidate/)
