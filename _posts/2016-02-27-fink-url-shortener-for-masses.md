---
layout: post
title: Fink, URL Shortener for Masses
image: https://i.imgur.com/AvCF4mP.jpg
date: '2016-02-27 19:28:20'
tags:
- product
---

Months ago I created [Fink](http://xn--rn8h.ws/), a URL Shortener service that I called it *for masses*.

In this post I'm going to explain the main idea behind it and technical goals that I wanted to supply.

# Main idea was totally different

I was studying about [BitTorrent](https://en.wikipedia.org/wiki/BitTorrent). For me, It's totally fascinating how the protocol (one of the most popular of the world) has been evolving promoted by political laws to be finally a serverless protocol. Study how  the protocol connects the peers around the world using the minimal infrastructure necessary is, in fact, study the history of Internet.

For do it, the traditional protocol uses a set of complementary specifications that make it more robust and enable the possibility of serverless state, such as [DHT](http://engineering.bittorrent.com/2013/01/22/bittorrent-tech-talks-dht/), [PEX](https://en.wikipedia.org/wiki/Peer_exchange) or [Magnet URIs](https://es.wikipedia.org/wiki/Magnet).

First I started reading about DHT to know how happens [bootstrapping node](https://en.wikipedia.org/wiki/Bootstrapping_node) process to get all the information necessary from an initial state and how the protocol extend this mechanism using magnet URIs to not be necessary store torrent files never more.

# The Emoji part of this history

At this point, I thought: would be possible define a Magnet URI based on Emojis? ðŸ˜„.

Emojis are a popular topic nowadays and I personally think that it unleashed the power to communicate online: Sometimes the best way to express something is using a emoji. They are a natural evolution of ASCII faces. They have come to stay.

Exists a set of products with emoji base as well, so why not experiment with emojis was the new question.

# Walking around the question

Partially yes, you can implement it, but the problem is that no exists torrent client that recognizes it (yet), and it's obvious. 

Why should it? What's the point to use a emoji magnet URI? Don't have sense for a normal human.

I suppose that I think in that to be it more social friendly and funny.

I started speaking about that with [@wa7son](https://twitter.com/wa7son) and he suggested me:

> Hey, maybe not possible use emojis in a magnet-uri, but what do you think about use a URL based on emoji that redirect to magnet URI <span>@wa7son</span>

We make a little test to try redirect between protocols and works incredible well ðŸ˜ƒ.

# Technical implications about Emojis.

Emojis don't work as normal characters: Meanwhile a character is represented commonly in 1 byte, emoji need 3 or 4 bytes.

## In a tweet as text

Based on the byte explanation, wouldn't be possible write a tweet of 140 emojis but it is, because Twitter convert emojis into images (using [twemoji](https://github.com/twitter/twemoji)) and count each one as one character.

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr">ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€ðŸ€</p>&mdash; Kiko Beats âš¡ (@Kikobeats) <a href="https://twitter.com/Kikobeats/status/703168977254494209">February 26, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

In general, services as social networks converts emojis into images. This is because, between other decisions, customization is important.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I do not advise sending the kiss emoji to people running Firefox OS. <a href="https://t.co/0kQKMM0vaQ">pic.twitter.com/0kQKMM0vaQ</a></p>&mdash; Jordan Hall (@DivineOmega) <a href="https://twitter.com/DivineOmega/status/696470046533619712">February 7, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## In a tweet as link

It's interesting because when an emoji is present into a URL, itâ€‹ doesn't work as you can expect.

An URL (on Twitter) needs 23 characters. These characters are counted as representation of the link and doesn't matter what URL shortener you use for generate the link: All links are counted as 23 characters

![](https://i.imgur.com/enzwRo5.png)
*140 - 117 = 23 characters for represent a normal link.*

But if you use an URL based on emojis, instead of count it as 23 characters, the URL counts as the URL extension and now, the emoji is not represented as image!

![](https://i.imgur.com/gh7eO4v.png)
*dafuq twitter, I have more space for words*

It's means that, at the major part of the time, are saving space for write more in your tweets because rarely a URL shortener takes more than 22 characters.

# Building the service

## Additional Features

At this moment we have the features:

- Redirect between URI's (original idea).
- Support emoji representation (social network friendly).

And I decided add two more to make the service more complete.

### Make URL shortener as possible

This sounds obvious but it is not. How services as [bitly](http://bit.ly) make URL short?

First time you can think in a number counter that you increment and you associate with each URL created.

```
0,1,2,3,4,5,6,7,8,9,10,11..
```

It's a good start, but looks that the counter is based in a decimal system. `10` is compose by two numbers. What about use hexadecimal instead to avoid increase the number of element in the counter?

```
0,1,2,3,4,5,6,7,8,9,a,b,...
```

It's looks better, but hexadecimal alphabet is tiny. We can use a bigger alphabet that include the rest of the letter. You can use [base58](https://en.wikipedia.org/wiki/Base58)!.

### URL are uniques

The point of the service is make URL short, so avoid same input with different output is necessary to be consistent and get the most short output possible.

Two users that register the same URI get the same output. Simple!.

Also I register an emoji URL domain to put a little of âœ¨.

## Technical Stack

Coding time. I selected a very tiny stack of things known to me and I wanted to try new things. The idea is make this fast with he old things that works and try new things that I can incorporate (or not) in next projects.

### Backend Side

The most important decision that I did in this project was choose [leveldb](https://github.com/Level/levelup) as database. I wanted to test this database long time ago and this project scenario looks perfect for do it

Simple as rock and faster, I had to put a little of love to have query by field but works fine.

On the other hand I had to write library [parse-uri](https://github.com/Kikobeats/parse-uri) and [is-uri](https://github.com/Kikobeats/is-uri) to validate URIs and maybe was the hard part of the project because I didn't found a standard library and I had to create my own tools.

### Frontend Side

I was always thinking in writingâ€‹ a tiny frontend. I was looking for a tiny CSS blueprint that â€‹providesâ€‹ me a basic grid and elemental â€‹tagâ€‹ style, and I found [Milligram](https://milligram.github.io/). It â€‹wasâ€‹ a discovery!

Later I decided to compliment it with something*â€‹ like React but tinierâ€‹, to avoid interacting with DOM using jQuery (or equivalent). â€‹Inâ€‹ this case I chose [riotjs](http://riotjs.com/)  library and I'm happy with it.

The result: less than 60KB between JS/CSS. this reinforced my concept of small around the project.

# Finish it

You can see it working at [ðŸ€.ws](http://xn--rn8h.ws/).

Also code is open source under [Fink organization](https://github.com/finkhq) on GitHub, so you can host your own URL Shortener ðŸ™‚.

For future, I want to write a little Admin panel to see total of URL's registered.