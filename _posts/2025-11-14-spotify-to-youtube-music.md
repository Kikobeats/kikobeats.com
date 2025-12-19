---
layout: post
title: Spotify → YouTube Music
date: '2025-11-14'
og_image:
  canvas:
    background_image: /images/spotify---youtube-music/header.jpeg
---

Moving from Spotify to YouTube Music takes a few steps, but once you’re set up, the experience is great.

The main advantage is that you also get YouTube Premium, so you can watch YouTube completely ad-free.

Here’s the quickest way to migrate your liked songs and configure everything properly.

## 1. Prepare your library

Open Spotify → go to **Liked Songs** → select all → **Add to playlist**.

This makes transferring everything much easier.

## 2. Set up your account

Buy [YouTube Premium for €5](https://www.sharesub.com/en) so you can use YouTube Music without ads and with background playback.

## 3. Install the desktop client

YouTube Music doesn’t have a native desktop client, but you can create one using [Pake](https://github.com/tw93/Pake).

![](/images/spotify---youtube-music/tw93staticmainpakeyoutubemusic.png)

I used it for a tons of website that does not offer a native app. You can find YouTube Music as part of the README:

**Download YouTube Music:** [Mac](https://github.com/tw93/Pake/releases/latest/download/YouTubeMusic.dmg) [Windows](https://github.com/tw93/Pake/releases/latest/download/YouTubeMusic_x64.msi) [Linux](https://github.com/tw93/Pake/releases/latest/download/YouTubeMusic_x86_64.deb)

## 4. Transfer your music

Use [TuneMyMusic](https://www.tunemymusic.com/) to transfer your Spotify playlist to YouTube Music.  
Just pay for it — it works reliably and saves time.

In my case, for around 3,000 songs, just 10 was missing.

## 5. Reset your likes

YouTube Music might already contain some liked songs, so let’s reset them.

Go to **Liked Songs**, open your browser console, and run:

```js
const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function unlikeAll() {
  const items = [...document.querySelectorAll('ytmusic-responsive-list-item-renderer')];
  let count = 0;

  for (const item of items) {
    // The like / unlike button
    const likeBtn = item.querySelector('#button-shape-like button');

    if (!likeBtn) continue;

    const isLiked = likeBtn.getAttribute('aria-pressed') === 'true';

    if (isLiked) {
      likeBtn.click();
      count++;
      console.log(`Removed like #${count}`);
      await delay(400);
    }
  }

  console.log('✔ Done. If you have many songs, scroll down and run again.');
}

unlikeAll();
```

## 6. Add your new likes

Open your transferred playlist and run this in the browser console:

```js
const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function likeAll() {
  const items = [...document.querySelectorAll('ytmusic-responsive-list-item-renderer')].reverse();
  let count = 0;

  for (const item of items) {
    const likeBtn = item.querySelector('#button-shape-like button');

    if (!likeBtn) continue;

    const isLiked = likeBtn.getAttribute('aria-pressed') === 'true';

    if (!isLiked) {
      likeBtn.click();
      count++;
      console.log(`Liked #${count}`);
      await delay(400);
    }
  }

  console.log('✔ Done. If not all songs loaded, scroll down and run again.');
}

likeAll();
```

## 7. Adjust mobile settings

YouTube Music on iOS sometimes adds random songs to playlists.  

To avoid this, go to: **Settings → Playback and restrictions** and ensure it looks like the screenshot:

![](/images/spotify---youtube-music/mzlif7a.png)

---

And that’s it — your Spotify library should now be fully transferred and correctly liked on YouTube Music.
