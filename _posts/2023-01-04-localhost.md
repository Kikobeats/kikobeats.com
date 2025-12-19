---
layout: post
title: Local IP address
date: '2023-01-04'
og_image:
  canvas:
    background_image: /images/local-ip-address/header.jpeg
---

Given the following HTTP server:

```js
const { createServer } = require('http')
const { once } = require('events')

const server = createServer((req, res) => {
  res.writeHead(200)
  res.end('Hello, World!')
})

const listen = async (...args) => {
  server.listen(...args)
  await once(server, 'listening')
  const { address, port, family } = server.address()
  return `http://${family === 'IPv6' ? `[${address}]` : address}:${port}/`
}

Promise.resolve().then(async () => {
  const url = await listen({ host: '0.0.0.0', port: 3000 })
  console.log(`Listening at ${url}`)
})
```

There are different ways to expose it setting up `host` and `port`.

## 127.0.0.1

The `127.0.0.1` (`::1` in IPv6) is also called "loopback" or local-only interface.

```bash
# Listening at http://127.0.0.1:3000/

curl http://127.0.0.1:3000/ # 'Hello, World!'
curl http://192.168.4.50:3000/ # nothing
```

That means server is actually not listening external request, all the stuff run in your computer. It's used for putting servers running on production.

## localhost

The `localhost` is actually an OS IPv4 alias for `127.0.0.1`. The IPv6 equivalent is `[::]`

It's preferred to use the IP address rather than an alias since we don't have control over it.

## 0.0.0.0

The `0.0.0.0` (`::` in IPv6) tells the server to listen listen on every available network interface.

It's mainly used for listening request in your local network.

```bash
# Listening at http://0.0.0.0:3000

curl http://[::]:3000/ # 'Hello, World!'
curl http://[::1]:3000/ # 'Hello, World!'
curl http://0.0.0.0:3000/ # 'Hello, World!'
curl http://127.0.0.1:3000/ # 'Hello, World!'
curl http://192.168.4.50:3000/ # 'Hello, World!'
```

**Note** `::` is not a valid URL by [standard](https://www.rfc-editor.org/rfc/rfc2732#section-2), but `[::]` is.

This is useful for accessing to the server using a different device connected over the same local network.

## port 0

The port 0 is used to assign any available port determined by the OS.

Sometimes you want to do that after try for a preferred port.

```js
try {
  return await listen({ host: '0.0.0.0', port: 3000 })
} catch (error) {
  if (error.code !== 'EADDRINUSE') throw error
  return await listen({ host: '0.0.0.0', port: 0 })
}
```
