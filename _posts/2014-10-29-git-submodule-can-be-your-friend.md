---
layout: post
title: Git Submodule can be your friend
image: http://jonathanmh.com/wp-content/uploads/2012/10/git_logo-1024x480.png
date: '2014-10-29 22:44:46'
tags:
- computer-science
---

## Initialize submodule

```
git submodule init
git submodule update
```

## Add a submodule

```
git submodule add git://github.com/chneukirchen/rack.git rack  
```

## Delete a submodule

```
git submodule deinit asubmodule  
git rm asubmodule  
git rm --cached asubmodule  
```

## Update a submodule

```
git submodule foreach git pull origin master  
```