---
layout: post
title: Analyzing JavaScript dependencies
image: https://i.imgur.com/gyCeulk.jpg
date: '2017-08-12 15:03:02'
tags:
- javascript
---

In this blog post, I go to collect a set of tools used to help developers choose better dependencies and see the hidden cost of your choices.

  
## Packagephobia

![](https://i.imgur.com/U5WP0LG.png)

[Packagephobia](https://packagephobia.now.sh/) reports you:

- The publish size at NPM registry.
- Install size after `npm install`
- Evolution of both metrics over each version released.

## Bundlephobia

![](https://i.imgur.com/AQyExPj.png)

[Bundlephobia](https://bundlephobia.com/) is pretty similar to packagephobia but oriented from a frontend side perspective, reporting you the size based of the webpack bundle size.

## pkgfiles

[pkfiles](https://www.npmjs.com/package/pkfiles) list all files which would be published in a package.

It's great use before release a new version and know what will be inside the bundle.

```
$ pkgfiles

PATH             SIZE     %
.gitattributes   12 B     0%
test/mocha.opts  80 B     1%
.travis.yml      83 B     1%
.npmignore       120 B    2%
.editorconfig    365 B    5%
.bumpedrc        644 B    10%
index.js         779 B    12%
LICENSE          1.11 kB  17%
package.json     1.68 kB  25%
README.md        1.78 kB  27%

DIR              SIZE     %
test/            80 B     1%
.                6.65 kB  100%

PKGFILES SUMMARY
Size on Disk with Dependencies  ~104 MB
Size with Dependencies          ~58.8 MB
Publishable Size                ~6.65 kB
Number of Directories           2
Number of Files                 10
```

You can complement it perfectly with [`files` fields at your `package.json`](https://docs.npmjs.com/files/package.json#files).

## depcheck

[depcheck](https://www.npmjs.com/package/depcheck) is a tool for analyzing the dependencies in a project to see: how each dependency is used, which dependencies are useless, and which dependencies are missing from `package.json`.


```
$ depcheck
Unused dependencies
* micro-get
Unused devDependencies
* git-dirty
```

I love use this tool specially in projects with many contributors, where the codebase can change a lot every day and you install and remove dependencies without criteria.

## size-limit

![](https://github.com/ai/size-limit/raw/master/screenshots/example.png)

[size-limit](https://github.com/ai/size-limit) is a tool to prevent JavaScript libraries bloat. With it, you know exactly for how many kilobytes your JS library increases the user bundle.

Adding `size-limit` to your continuous integration service (such as Travis CI) is the best way to don't increment the size of the library unintentionally.

## next-update

![](https://i.imgur.com/62wn5B2.png)

[next-update](https://github.com/bahmutov/next-update) aims for automatize your upgrade dependencies process.

It runs your project tests upgrading your sub-dependencies tree until found a combination that breaks your code. It will be determinate your ideal version so you can update your dependencies without break your code.

It's very useful when you need to maintain an outdated project for a time ago

