---
layout: post
title: Client-Side Caching
date: '2021-09-19'
image: /images/client-side-caching/header.jpeg
---

At [microlink.io](https://microlink.io), keeping the [Microlink API](https://api.microlink.io) faster is one of the core values of the service, so always there is something that can be improved to decrease response time.

One of those sweet spots I recently found is to complement an already caching strategy with a local strategy.

Historically, Microlink has used Redis as the main volatile caching storage.

```
+-------------+                                +-----------+
|             | ------- GET id:123 ----------> |           |
|     API     |                                |   CACHE   |
|             | <--------- HIT --------------- |           |
+-------------+                                +-----------+
```

An internal cache can be for a lot of things, like:

- Preventing to re-compute CPU intensive tasks in a short time.
- Resolve domains using DNS lookup and cache results for a while.
- Check if an URL is reachable and HTTP statuses code associated.

Sometimes real-time is an unnecessary luxury. For those cases, saving time just reusing a value previously obtained is okay.

Although it's performing great, there is always the worst scenario.

What if the cost of calculating something is faster than access to the cache?

Even Redis is one of the fastest storage out there, could be a situation where lookup into the cache is simply not worth it.

That actually could be a big problem if your cache store is not close to your servers, since what you are gaining is being lost by simply the network requests distance.

A local strategy on top of your cache saves the party since it's using a memory application (faster than a network call) as an extra cache layer.

```
+-------------+                                +-----------+
|             |                                |           |
|     API     |      ( No network call )       |   CACHE   |
|             |                                |           |
+-------------+                                +-----------+
| Local cache |
|             |
| id:123 =    |
| HIT         |
+-------------+
```

If you use [keyv](https://keyvhq.js.org), we recently released [@keyv/multi](https://github.com/microlinkhq/keyv/tree/master/packages/multi) to do exactly that:

```js
const KeyvMulti = require('@keyvhq/multi')
const KeyvRedis = require('@keyvhq/redis')
const QuickLRU = require('quick-lru')
const Keyv = require('@keyvhq/core')

const keyv = new Keyv({
  store: new KeyvMulti({
    local: new QuickLRU({ maxSize: 1000 }),
    remote: new KeyvRedis()
  })
})
```

It's like an L1 and L2 cache for your application. 

One of the cool things there is, when the local cache fails, the value is copied from the remote cache, so like a real cache, it's following the principle of [locality of reference](https://en.wikipedia.org/wiki/Locality_of_reference).

## Bibliography

- [Redis server-assisted client side caching](https://redis.io/topics/client-side-caching)
- [Keyv is a multi backend simple key-value storage](https://keyvhq.js.org)
