---
layout: post
title: HTTP POST Dilemma
image: http://i.imgur.com/N4urv8Q.png
date: '2015-12-22 17:31:02'
tags:
- computer-science
---

## as URL encoded

```bash
$ http -f POST https://httpbin.org/post foo=bar --verbose
POST /post HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 7
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Host: httpbin.org
User-Agent: HTTPie/0.9.2

foo=bar

HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 414
Content-Type: application/json
Date: Tue, 22 Dec 2015 17:11:33 GMT
Server: nginx

{
    "args": {},
    "data": "",
    "files": {},
    "form": {
        "foo": "bar"
    },
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Content-Length": "7",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        "Host": "httpbin.org",
        "User-Agent": "HTTPie/0.9.2"
    },
    "json": null,
    "origin": "81.203.62.216",
    "url": "https://httpbin.org/post"
}
```

## as JSON

```bash
$ http -j POST https://httpbin.org/post foo=bar --verbose
POST /post HTTP/1.1
Accept: application/json
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 14
Content-Type: application/json
Host: httpbin.org
User-Agent: HTTPie/0.9.2

{
    "foo": "bar"
}

HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 412
Content-Type: application/json
Date: Tue, 22 Dec 2015 17:12:28 GMT
Server: nginx

{
    "args": {},
    "data": "{\"foo\": \"bar\"}",
    "files": {},
    "form": {},
    "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Length": "14",
        "Content-Type": "application/json",
        "Host": "httpbin.org",
        "User-Agent": "HTTPie/0.9.2"
    },
    "json": {
        "foo": "bar"
    },
    "origin": "81.203.62.216",
    "url": "https://httpbin.org/post"
}
```

## What's the point?

I found a clarifier comment about this topic in [StackOverflow](http://stackoverflow.com/a/13457437):

> If the structure of encoded data is guaranteed to be a flat list of name-value pairs, `x-www-form-urlencoded` seems sufficient. If the structure could be (arbitrarily) complex (e.g. nesting lists or associative arrays), then definitely use JSON.

And also:

> In your situation JSON/XML/whatever is extra costs in time, memory and CPU cycles. `x-www-form-urlencoded` data combine readability and compactness so I can bet it's your choice.

## The rule

First,  don't use more than you need. Keep it simple!

If you need send a form or plain object, then use `x-www-form-urlencoded`.
In other case use `application/json` (and you will have to stringify before send and parse after send).
