---
layout: post
title: Analyzing JavaScript dependencies
image: https://i.imgur.com/gyCeulk.jpg
date: '2017-08-12 15:03:02'
tags:
- javascript
---

I want to recommend a set of CLI's tools to help you make better choices in your development process, keeping your dependency tree as minimal as possible.

## slow-deps

```
npm install -g slow-deps
```

[slow-deps](https://www.npmjs.com/package/slow-deps) is a tiny CLI tool to measure which dependencies in a project are the slowest to npm install.

```
$ slow-deps

Analyzing 7 dependencies...
[====================] 100% 0.0s
--------------------------------------------------
| Dependency           | Time  | Size   | # Deps |
--------------------------------------------------
| browserify           | 22.2s | 14 MB  | 94     |
| jshint               | 7.9s  | 4.6 MB | 26     |
| istanbul             | 7s    | 5.1 MB | 27     |
| promises-aplus-tests | 5.4s  | 2.4 MB | 24     |
| uglify-js            | 4.4s  | 1.7 MB | 18     |
| mocha                | 4.3s  | 924 KB | 16     |
| immediate            | 1.3s  | 24 KB  | 0      |
--------------------------------------------------
Total time (non-deduped): 52.6s
Total size (non-deduped): 29 MB
```  
  
It's useful for detect what dependencies you can replace and improve your codebase size easily.
  
## package-size

While `slow-deps` is oriented for your *current* dependencies, `package-size` is more oriented in do a better selection of third party dependencies before add it in your project.

```
npm install -g package-size
```

```
$ package-size request fetch

  package  size     minified  gzipped
   request  2.06 MB  1.05 MB   300 kB
   fetch    673 kB   283 kB    220 kB
```

## pkgfiles

```
npm install -g pkgfiles
```

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

```
npm install -g depcheck
```

[depcheck](https://www.npmjs.com/package/depcheck) is a tool for analyzing the dependencies in a project to see: how each dependency is used, which dependencies are useless, and which dependencies are missing from `package.json`.


```
$ depcheck
Unused dependencies
* micro-get
Unused devDependencies
* git-dirty
```

I love use this tool specially in projects with many contributors, where the codebase can change a lot every day.

and you install and remove dependencies without criteria.

## size-limit

```
npm install -g size-limit
```
[size-limit](https://github.com/ai/size-limit) is a tool to prevent JavaScript libraries bloat. With it, you know exactly for how many kilobytes your JS library increases the user bundle.

You can add Size Limit to your continuous integration service (such as Travis CI) and set the limit. If you accidentally add a massive dependency, Size Limit will throw an error.

![](https://github.com/ai/size-limit/raw/master/screenshots/example.png)

This is specially useful when you want to improve the developer experience associated with our libraries.