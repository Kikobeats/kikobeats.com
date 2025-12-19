---
layout: post
title: Glob Patterns
og_image:
  canvas:
    background_image: /images/avatar-glitch.jpg
date: '2016-08-09 14:02:17'
---

A [glob](https://en.wikipedia.org/wiki/Glob_(programming)) is a short expression that lets you select a bunch of files. 99% of the time, there's an asterisk involved.

Here's a (*non exhaustive*) list of the most useful patterns.

Depends of your glob engine, it could support more or less complex expressions. The follow list is tested using **zsh**.

### List every file in the folders directly below the `test` folder

```bash
$ ls test/*
```

### List every file in every folder two levels below the `test` folder

```bash
$ ls test/*/*
```

### List every file anywhere below the `test` folder

```bash
$ ls test/**/*
```

### List every file that ends in `.json` in every folder at any level below the `test` folder

```bash
$ ls test/**/*.json
```

### List every file that ends in `.json` or `.js` in every folder at any level below the `test` folder

```bash
ls test/**/*.(json|js)
```

## Bibliography

* [Master Your Z Shell with These Outrageously Useful Tips](http://reasoniamhere.com/2014/01/11/outrageously-useful-tips-to-master-your-z-shell).
* [ZSH Expansion](http://zsh.sourceforge.net/Doc/Release/Expansion.html).
