---
layout: post
title: The best CDN for optimizing images
date: '2023-01-02'
image: images/the-best-cdn-for-optimizing-images/header.jpeg
---

Internet is wild and a lot of services out there can be used to accomplish image optimization on-fly.

One of my favorites is [images.weserv.nl](https://images.weserv.nl/) because:

- It's simple, on point, easy to use.
- The performance is super neat, on top of CloudFlare edge nodes.
- The code is available on [GitHub](https://github.com/weserv).

Here is the code snippet I often reuse of my projects:

```js
const imageUrl = (url, opts) =>
  `https://images.weserv.nl/?${new URLSearchParams({
    
    /* The image URL to optimize */
    url,
    
    /* In case something goes wrong, just show the image */
    default: url,
    
    /* 
      Compress it as much as possible (PNG).
      See: https://images.weserv.nl/docs/format.html#compression-level 
    */
    l: 9,
    
    /* 
      Reduce PNG file size.
      See: https://images.weserv.nl/docs/format.html#adaptive-filter
    */
    af: '',
    
    /*
      Enable image optimization for GIF and JPEG.
      See: https://images.weserv.nl/docs/format.html#interlace-progressive
    */
    il: '',
    
    /*
      Enable image optimization for WebP and GIF.
      See: https://images.weserv.nl/docs/format.html#number-of-pages
    */
    n: -1,

    /* 
      Pass any other option.
      See https://images.weserv.nl/docs/quick-reference.html 
      
      It's recommended to pass `w` for cutting down the image size.
    */
    ...opts
  }).toString()}`
```

This snippet has been used for years in projects like [unavatar.io](https://unavatar.io), [microlink.io](https://microlink.io), [teslahunt.io](https://teslahunt.io), and counting.
