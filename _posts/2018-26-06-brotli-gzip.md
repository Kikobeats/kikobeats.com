---
layout: post
title: Brotli is the new gzip
date: '2018-06-26'
image: https://i.imgur.com/8LJazpw.jpg
tags:
- computer-science
---

## What is brotli

**​​​​​Brotli** is an open source, lossless data compression algorithm developed by Google, with a better compression density than gzip that reduces bandwidth consumption and helps content load faster.

[](https://github.com/google/brotli){:.card-preview}

Although it is still in development, brotli aspires be the next general purpose compression algorithm for the web.

![](https://i.imgur.com/lm8QGFQ.png)

Nowadays, **brotli** support in web browsers is above 80%.

## What about gzip

![](https://i.imgur.com/djHRzz9.png)

**gzip** is the de facto standard compression algorithm for the web. The initial release was 25 years ago 😱. 

Actually gzip and brotli are very related, using LZ77 and Huffman algorithms.

## How to support brotli

brotli is a promising compression algorithm and every year is better, at least you should be able to support it to offer an alternative to gzip.

If you are using a CDN like CloudFlare, probably they are already supporting it.

![](https://i.imgur.com/XyuJuIV.png)
<figcaption>Enable brotli support at CloudFlare is as easy as move this checkbox.</figcaption>

If you are writing a web server, it depends on your programming language; [Node.js still not added as part of the core](https://github.com/nodejs/node/issues/18964) but for sure they will do that soon.

You can check if your web server has or not brotli support doing a [brotli test](https://tools.keycdn.com/brotli-test).

## Bibliography

- [Akami: Understanding Brotli's potential](https://blogs.akamai.com/2016/02/understanding-brotlis-potential.html).
- [CloudFlare: Results of experimenting with Brotli for dynamic web content](https://blog.cloudflare.com/results-experimenting-brotli/).
- [Compression Benchmarks: brotli, gzip, xz, bz2](https://www.opencpu.org/posts/brotli-benchmarks/).