---
layout: post
title: 'Finepack, organizes your JSON files'
image: images/finepack-organizes-your-json-files/header.png
date: '2015-03-08 09:18:26'
---

This week I wrote a library that I could write some time ago: [finepack](https://github.com/Kikobeats/finepack).

It's a simple library with a simple purpose: keep the JSON files of your projects (like *bower.json* or *package.json*) maintainable and readable.

The library do things like:

- Check if you have the most important properties, as *version* or *name* and put it in the top of the file.

- Sort the rest of the project alphabetically and recursively. For do it, first I wrote a little library called [sort-keys-recursive](https://github.com/Kikobeats/sort-keys-recursive).

- Report the error with a beatiful CLI output.

About the internal design, I'm very happy with the result. I tried to write the most elegant approach using the shortest code. All class have less than 50 lines of code, and is really easy to extend.

At this moment I'm collecting ideas to extend it. Feel free to leave a [Feature Request](https://github.com/Kikobeats/finepack/labels/Feature%20Request) :-)
