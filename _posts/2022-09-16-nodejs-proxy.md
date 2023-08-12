---
layout: post
title: Proxyfiying in Node.js
date: '2022-09-16'
image: /images/proxyfiying-in-nodejs/header.jpeg
---

For historical reasons there are a lot of NPM modules for doing this, but nowadays, it's easier than ever just using native APIs:

```js
const { listen } = require('async-listen')

const createProxyServer = async (endpoint, ...args) => {
  const proxyServer = http.createServer((req, res) => {
    const proxyRequest = http.request(
      new URL(req.url, endpoint).toString(),
      {
        method: req.method,
        headers: req.headers
      },
      proxyResponse => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers)
        proxyResponse.pipe(res, { end: true })
      }
    )
    req.pipe(proxyRequest, { end: true })
  })

  const url = await listen(proxyServer, ...args)
  proxyServer.url = url.toString()

  return proxyServer
}
```

and using it:

```js
const onFinished = require('on-finished')

const proxy = await createProxyServer('http://localhost:1337/', { 
  host: '0.0.0.0', 
  port: 3000 
})

proxy.on('request', (req, res) => {
  const timestamp = Date.now()
  onFinished(res, () => {
    console.log(
      `${req.method} HTTP/${req.httpVersion} (${req.headers['user-agent']}) ${req.url} → ${res.statusCode} in ${Date.now() - timestamp}ms`
    )
  })
})

console.log(`> Proxy listening at ${proxy.url}`)
```

Easy peasy!
