---
layout: post
title: Speed is the feature
date: '2019-11-04'
og_image:
  canvas:
    background_image: /images/speed-is-the-feature/header.jpeg
---

![](/images/speed-is-the-feature/m1qzux6.png)

<figcaption>Taking real time screenshots using <a href="https://api.microlink.io">api.microlink.io</a>, from 15s to ~900ms.</figcaption>

We love [fast software](https://craigmod.com/essays/fast_software), at all levels: as instant as the software is, a better perception of engineering quality we have.

However, speedy software isn't a feature you can add in a product sprint. It's a constant mindset, and the only way to achieve that is [going fast slowly](https://varnish-cache.org/docs/6.2/phk/thatslow.html).

But how to constantly improve something that constantly change?

> If you want to write fast software, use a slow computer
<cite><a href='https://x.com/dominictarr/status/629992939738005504'>Dominic Tarr</a></cite>.

There are a set of things that never – or _rarely_ – change, being [anticipation the key to performance](https://zeit.co/blog/next#anticipation-is-the-key-to-performance).

### Understand where your code run

Yeah, I know, it sounds very obvious, but most of us, as programmers, think code and infrastructure are separate things, while they are very linked.

- It isn't the same run an interpreted language vs. compiled languages.
- It isn't the same run inside virtual container vs. host filesystem.
- It isn't the same run a CPU intensive vs. memory intensive software.
- It isn't the same scaling vertically vs. scaling horizontally.

In fact, if we want to think where _physically_ the software is running, the differences are even more obvious.

![](/images/speed-is-the-feature/hwood9y.jpeg)

<figcaption>From <a href="https://x.com/frioux/status/918130735034314752">Systems Performance at Scale</a>.</figcaption>

### Understand what your code does

The smarter way to improving software is by identifying the slowest part that is being used more time. Then the speed up will have a significantly higher impact than improving other minor software aspects. 

That's is known as [Amdahl's law](https://en.wikipedia.org/wiki/Amdahl's_law).

If you want to be fast by default, you need to understand what is running under your software:

- Are you using network resources? Where are the network resources living? 
- Which is the network policy? How are you sending the data throughout the network? 
- Where are you storing your data? Do you need to keep all the data?
- Do you need to retrieve all the data at the same time?

This a primordial step to identify what feels slow and where slowness comes from.

Choose what to improve is the hard thing, but it makes unnecessary to optimize all the things.

Most common improvements are actually time optimizations: Instead of serving a real time™ – and _costly_ – response, we can say it is OK serving a pre-calculated response but much much cheaper.

They are done every time you:

- Use a memoized function.
- Setup a shared LRU cache.
- Compress repetitive data using gzip/brotli.
- Send a 304 Not Modified response.
- Use a replica set architecture.

## Bibliography

- [Going fast slowly, by Varnish Cache](https://varnish-cache.org/docs/6.2/phk/thatslow.html).
- [Fast Software, the Best Software, by Craig Mod](https://craigmod.com/essays/fast_software/).
- [Computer latency: 1977-2017](https://danluu.com/input-lag/).
- [Latency Numbers Every Programmer Should Know](https://people.eecs.berkeley.edu/~rcs/research/interactive_latency.html).
- [Slow software, by Mark McGranaghan](https://www.inkandswitch.com/slow-software.html).
- [7 Principles of Rich Web Applications](https://rauchg.com/2014/7-principles-of-rich-web-applications#act-immediately-on-user-input).
- [The Swiss Army Knife of Hashmaps](https://blog.waffles.space/2018/12/07/deep-dive-into-hashbrown/).
- [Do You Know How Much Your Computer Can Do in a Second?](https://computers-are-fast.github.io/).
