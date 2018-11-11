---
layout: post
title: Base58 Is Base64 for Humans
image: https://i.imgur.com/TXWfO18.jpg
date: '2016-01-11 23:05:45'
tags:
- computer-science
---

I discovered it reading the spanish version of the Wikipedia [bitcoin](https://es.wikipedia.org/wiki/Bitcoin#Direcciones) entry.

Basically is [base64](https://en.wikipedia.org/wiki/Base64) but avoiding the confuse characters:

- 0 (zero)
- O (capital o)
- I (capital i)
- l (lower case L)
- The non-alphanumeric characters (`+` (plus) and `/` (slash).)

# When use it

First, the method is well-suited to encode large integers, but not designed to encode longer portions of binary data.

On the other hand, remember that Base64/58 is not a criptography algorithm: It was created simply to encoding _binary-to-text_ and basically is the only way to send binary data in protocols that doesn't support binary data in the transport, for example, emails protocols such as [IMAP](https://es.wikipedia.org/wiki/Internet_Message_Access_Protocol), [POP3](https://es.wikipedia.org/wiki/Post_Office_Protocol) or [SMTP](https://es.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol).

But, such as Bitcoin protocol, we can use it for other controlled actions.

For example, `6857269519` becomes `brXijP` in Base58 encoded. It's basically the way how flickr create urls shortcuts (http://flic.kr/p/brXijP).

If we suppose that each number from `0` to `6857269519` is an unique id associated with each image hosted in Flickr, we have a good incremental system to get a shortcut url from image id!

# Bonus: Emoji!

I created a [encode-base58](https://github.com/kikobeats/encode-base58) to encode an string into a base58, also providing a *emoji-like* output:

<script src="https://embed.tonicdev.com" data-element-id="my-element"></script>

<!-- anywhere else on your page -->
<div id="my-element">
const encodeBase58 = require('encode-base58')
encodeBase58(9); // => 'a'
encodeBase58.emoji(9); // => '🔆'
</div>
