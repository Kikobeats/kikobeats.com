---
layout: post
title: MacBook open Spotify instead of iTunes
image: http://i.imgur.com/FsHNJ7u.jpg
date: '2015-10-12 08:52:00'
tags:
- hack
---

Times ago I used to use iTunes. Times when the iPod was the device for music fanatics, and the only way to sync up the library was using iTunes. But now, with services as Spotify, listen music in streaming is much more flexible. Now all changed.

I felt very irritated with that, each vez that I pulsed (sometimes was an error) the *play* button of my MBP, then iTunes starts run. oh my god, iTunes, sthap!! DAM!!.

So, it's time to change the behavior of the button!

I suspected there was a kind of *bind* between the fact of press the button (*the trigger*) and start iTunes (*the service*). Just I want to change the effect of pulse the trigger. It should not be too difficult.

Effectively, the name of this name is [rcd](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man8/rcd.8.html) and is possible to patch the behavior.

In the case of Spotify, I found a [repository for do it](https://github.com/Kikobeats/spotify-rcd) and surprise, works fine under OS X Capitan (I made a PR to update little issues, but works!)

Now, I'm a bit happier! 