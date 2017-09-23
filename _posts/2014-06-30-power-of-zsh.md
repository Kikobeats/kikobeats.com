---
layout: post
title: The power of ZSH
date: '2014-06-30 11:08:03'
tags:
- computer-science
---

This days I have discovered [zsh](https://en.wikipedia.org/wiki/Z_shell), [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) and finally [pure](https://github.com/sindresorhus/pure). 

![](http://i.imgur.com/i3XKpDC.png)

Now, I'm happy.

I adapted and revised my dotfiles to make it compatible with zsh. I've had rewritten some function that now works fine in bash/zsh and most are related to **Git** and **Github**. For example, if you are working with your terminal in a git directory:

```bash
$ gurl # open your browser with the url of the git repository.
```
```bash
$ gh <repository> # open your github account in the browser in the <repository> page.
```
```bash
$ geditor # open git modified files in Sublime Text
```

Obviously Sublime and Chrome are my preferences and you can set up whatever you like. It's not bad if you are lazy, but if you are very lazy, you can type `glog` and get git log per commit clickable and linked with Github:

![](http://i.imgur.com/zW513vW.png)


Until now, this features is common for zsh and bash, but, why zsh is better than bash?

For example, for things like this: If you don't know what directory you want to enter, you can navigate between the options:

![](http://i.imgur.com/PcZw976.png)

or if you don't know the parameter for list hide files, you can check without going to man pages:

![](http://i.imgur.com/nW8s2eH.png)

Simply zsh is sugar for the terminal. zsh extended bash.


You can check and fork it in [Github](https://github.com/Kikobeats/dotfiles) :)

