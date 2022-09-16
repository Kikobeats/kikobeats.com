---
layout: post
title: Proxyfiying in Node.js
date: '2022-09-16'
image: https://i.imgur.com/CFKl9PT.jpg
---

For historical reasons there are a lot of NPM modules for doing this, but nowadays, it's easier than ever just using native APIs:

```js
const createProxyServer = () => {
  const resources = []

  const proxyServer = http.createServer((req, res) => {
    resources.push([req.url, res])

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
  
  proxyServer.url = `http://[::]:${proxyServer.address().port}`
  proxyServer.history = proxiedRequestUrls

  return proxyServer
}
```

Easy peasy!
