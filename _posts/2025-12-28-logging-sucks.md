---
layout: post
title: Less suck logs
date: '2025-12-28'
image: /images/less-suck-logs/header.jpeg
---

Logging doesn’t suck because of tooling.

It sucks when logs are hard to read, hard to correlate, and lack context.

Most production issues aren’t solved by adding more logs, but by making existing logs easier to work with: easy to scan under pressure, easy to correlate to a single request, and easy to filter with basic tools like `grep`.

![](/images/less-suck-logs/xbkvp9j.png)

The site [loggingsucks.com](https://loggingsucks.com) does a great job explaining why logging often fails in practice. This post builds on those ideas and adds a few concrete patterns that have worked well for me in real production systems.

## Make logs easy to read

![](/images/less-suck-logs/terminal.png)

Logs are produced by machines, but they’re read by humans, usually under stress.

If logs aren’t easy to scan, they fail at their primary job.

Years ago, Heroku popularized the [logfmt](https://devcenter.heroku.com/articles/writing-best-practices-for-application-logs) format. It strikes a great balance between machine-friendly and human-readable logs by using simple `key=value` pairs:

Your eyes can instantly pick out what matters, and machines can still parse everything reliably.

### Use a consistent logging format

Because of that, I’ve standardized on logfmt for most of my projects using [debug-logfmt](https://github.com/Kikobeats/debug-logfmt). It writes logs to stdout/stderr using logfmt, while keeping the familiar `debug` API:

```js
const debug = require('debug-logfmt')('metascraper')

debug('retry', { url: 'https://kikobeats.com' })
debug.info('done', { time: Date.now() })
debug.warn('token expired', { timestamp: Date.now() })
debug.error('whoops', { message: 'expected `number`, got `NaN`' })
```

This gives you:

- Structured logs  
- No JSON noise  
- Easy grepping  
- Zero friction during development  

There is another subtle detail that, did you note that? The output is colorized:

<pre><code><span style="font-weight:bold; color:#2E7D32">api:lightship</span> signalReady limit=hard signal=ready
<span style="font-weight:bold; color:#BF360C">api</span> address=http://[::]:3000/ environment=development node=24.11.1 status=listening version=3.18.78 duration=113ms
<span style="font-weight:bold; color:#00695C">req-frequency</span> requests=1 perMinute=1 perSecond=0.0
<span style="font-weight:bold; color:#9E7700">api:cache</span> key=EXA4OVNWtQz url="https://x.com/verge/status/957383241714970624&amp;force=" authorization="Bearer lEhTGCfOo6" accept-encoding="gzip, deflate, br" host=localhost:3000 connection=keep-alive
<span style="font-weight:bold; color:#9E7700">browserless:info</span> create proxyServer=false retry=2 timeout=8861 concurrency=1 mem="374 MB" duration=16ms
<span style="font-weight:bold; color:#7B1FA2">html-get</span> prerender url=https://x.com/verge/status/957383241714970624 state=success
<span style="font-weight:bold; color:#AD1457">api:html:info</span> get url=https://x.com/verge/status/957383241714970624 statusCode=200 mode=prerender duration=3.7s
<span style="font-weight:bold; color:#AD1457">media</span> logo input=https://abs.twimg.com/responsive-web/client-web/icon-ios.77d25eba.png url=input type=png size=13160 height=1024 width=1024 size_pretty="13.2 kB" duration=298ms
<span style="font-weight:bold; color:#AD1457">media</span> image input=https://pbs.twimg.com/media/DRg1OMRVwAEuwTK.jpg url=input type=jpg size=175887 height=1080 width=1080 size_pretty="176 kB" duration=296ms
<span style="font-weight:bold; color:#006064">cacheable-response</span> key=EXA4OVNWtQz isHit=false isExpired=true isStale=false result=false etag="2fb1-OFTturlbVqQ0NEljteW2CSCUGNA" ifNoneMatch=undefined isModified=true
<span style="font-weight:bold; color:#283593">cloudflare-purge</span> files=https://c.microlink.io/EXA4OVNWtQz.json isFulfilled=true duration=197ms
<span style="font-weight:bold; color:#BF360C">api</span> status=200 ip=::ffff:127.0.0.1 /?url=https%3A%2F%2Fx.com%2Fverge%2Fstatus%2F957383241714970624&amp;force= duration=5.2s size="12 kB"
<span style="font-weight:bold; color:#9E7700">browserless:info</span> close timeout=false concurrency=0 mem="453 MB" duration=3ms
</code></pre>

Color improves log readability and visual pattern matching. Most systems support colorized ASCII output.

## Prefix logs by request lifecycle

The hardest part of logging isn’t writing logs; it’s reading the right ones.

This becomes especially painful under high concurrency, where logs from many requests are interleaved.  
When debugging a single request, you usually want to see everything related to that request, in order.

The simplest solution: prefix every log line with a request ID.

### Automatically prefix stdout/stderr in Node.js

In Node.js, this is surprisingly easy using `AsyncLocalStorage`.

The idea is simple:

- Generate a UUID per request  
- Store it in async context  
- Automatically prefix everything written to stdout / stderr  

Here’s a minimal implementation:

```js
'use strict'

const { AsyncLocalStorage } = require('async_hooks')
const { randomUUID } = require('crypto')

const asyncLocalStorage = new AsyncLocalStorage()

const originalStdoutWrite = process.stdout.write
const originalStderrWrite = process.stderr.write

const overrideWrite = (stream, originalWrite) => {
  stream.write = function (data, encoding, callback) {
    const store = asyncLocalStorage.getStore()
    if (store && store.logs) {
      const uuidString = store.uuid ?? ''
      store.logs.push({ stream, originalWrite, data: uuidString + ' ' + data, encoding, callback })
    } else {
      const uuid = typeof store === 'object' ? store?.uuid : store
      const uuidString = uuid ?? ''
      originalWrite.call(stream, (uuidString ? uuidString + ' ' : '') + data, encoding, callback)
    }
  }
}

overrideWrite(process.stderr, originalStderrWrite)
overrideWrite(process.stdout, originalStdoutWrite)

const getStore = () => asyncLocalStorage.getStore()

const getUUID = () => {
  const store = getStore()
  return typeof store === 'object' ? store.uuid : store
}

const withUUID = fn => asyncLocalStorage.run({ uuid: randomUUID(), logs: [] }, fn)

const flush = () => {
  const store = getStore()
  if (store && store.logs) {
    store.logs.forEach(({ originalWrite, stream, data, encoding, callback }) => {
      originalWrite.call(stream, data, encoding, callback)
    })
    store.logs = null
  }
}

module.exports = { getUUID, withUUID, flush, getStore }
```

Once this is in place, every log line automatically carries context.

### Attach the request ID early

You only need to wrap request handling once:

```js
const { withUUID, getUUID } = require('./uuid')

module.exports = (req, res, reqFrequency) =>
  withUUID(() => {
    // since now, any stdout/stderr is prefixed by uuid

    // associating the id with the request lifecycle
    req.id = getUUID()

    // associate the id with the response
    onHeaders(res, () => {
      res.setHeader('x-request-id', req.id)
    })
  })
```

No need to pass IDs around manually. No need to remember to log them.

### What the output looks like

The result is clean, readable, and trivially filterable:

<pre><code>
4206b33e-b040-4052-9931-dc11481c1fcf <span style="font-weight:bold; color:#2E7D32">api:lightship</span> signalReady limit=hard signal=ready
4206b33e-b040-4052-9931-dc11481c1fcf <span style="font-weight:bold; color:#BF360C">api</span> address=http://[::]:3000/ environment=development node=24.11.1 status=listening version=3.18.78 duration=113ms
4206b33e-b040-4052-9931-dc11481c1fcf <span style="font-weight:bold; color:#00695C">req-frequency</span> requests=1 perMinute=1 perSecond=0.0
4206b33e-b040-4052-9931-dc11481c1fcf <span style="font-weight:bold; color:#9E7700">api:cache</span> key=EXA4OVNWtQz url="https://x.com/verge/status/957383241714970624&amp;force=" authorization="Bearer lEhTGCfOo6" accept-encoding="gzip, deflate, br" host=localhost:3000 connection=keep-alive
4206b33e-b040-4052-9931-dc11481c1fcf <span style="font-weight:bold; color:#9E7700">browserless:info</span> create proxyServer=false retry=2 timeout=8861 concurrency=1 mem="374 MB" duration=16ms
4206b33e-b040-4052-9931-dc11481c1fcf <span style="font-weight:bold; color:#7B1FA2">html-get</span> prerender url=https://x.com/verge/status/957383241714970624 state=success
4206b33e-b040-4052-9931-dc11481c1fcf <span style="font-weight:bold; color:#AD1457">api:html:info</span> get url=https://x.com/verge/status/957383241714970624 statusCode=200 mode=prerender duration=3.7s
4206b33e-b040-4052-9931-dc11481c1fcf <span style="font-weight:bold; color:#AD1457">media</span> logo input=https://abs.twimg.com/responsive-web/client-web/icon-ios.77d25eba.png url=input type=png size=13160 height=1024 width=1024 size_pretty="13.2 kB" duration=298ms
4206b33e-b040-4052-9931-dc11481c1fcf <span style="font-weight:bold; color:#AD1457">media</span> image input=https://pbs.twimg.com/media/DRg1OMRVwAEuwTK.jpg url=input type=jpg size=175887 height=1080 width=1080 size_pretty="176 kB" duration=296ms
4206b33e-b040-4052-9931-dc11481c1fcf <span style="font-weight:bold; color:#006064">cacheable-response</span> key=EXA4OVNWtQz isHit=false isExpired=true isStale=false result=false etag="2fb1-OFTturlbVqQ0NEljteW2CSCUGNA" ifNoneMatch=undefined isModified=true
4206b33e-b040-4052-9931-dc11481c1fcf <span style="font-weight:bold; color:#283593">cloudflare-purge</span> files=https://c.microlink.io/EXA4OVNWtQz.json isFulfilled=true duration=197ms
4206b33e-b040-4052-9931-dc11481c1fcf <span style="font-weight:bold; color:#BF360C">api</span> status=200 ip=::ffff:127.0.0.1 /?url=https%3A%2F%2Fx.com%2Fverge%2Fstatus%2F957383241714970624&amp;force= duration=5.2s size="12 kB"
4206b33e-b040-4052-9931-dc11481c1fcf <span style="font-weight:bold; color:#9E7700">browserless:info</span> close timeout=false concurrency=0 mem="453 MB" duration=3ms
</code></pre>

You can now:

- `grep` by request ID  
- Copy-paste a full request trace  
- Correlate client errors with server logs instantly  
