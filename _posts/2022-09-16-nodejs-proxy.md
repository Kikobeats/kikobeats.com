---
layout: post
title: Proxyfiying in Node.js
date: '2022-09-16'
image: /images/proxyfiying-in-nodejs/header.jpeg
---

For historical reasons there are a lot of NPM modules for doing this, but nowadays, it's easier than ever just using native APIs:

```js
const createProxyServer = async (...args) => {
  const proxyServer = http.createServer((req, res) => {
    const proxyRequest = http.request(
      req.url,
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

  proxyServer.listen(...args)
  await once(proxyServer, 'listening')

  const { address, port, family } = proxyServer.address()
  const host = family === 'IPv6' ? `[${address}]` : address

  proxyServer.url = `http://${host}:${port}/`

  return proxyServer
}
```

and using it:


```js
const proxy = await createProxyServer({ host: '0.0.0.0', port: 3000 })

proxy.on('request', (req, res) => {
  const timestamp = Date.now()
  onFinished(res, () => {
    console.log(
      `${req.method} HTTP/${req.httpVersion} ${req.url} → ${res.statusCode} in ${Date.now() - timestamp}ms`
    )
  })
})

console.log(`Proxy listening at ${proxy.url}`)
```

Easy peasy!
