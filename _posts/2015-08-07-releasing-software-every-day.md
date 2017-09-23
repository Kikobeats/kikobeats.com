---
layout: post
title: Releasing software every day
image: http://i.imgur.com/PvI5Bux.jpg
date: '2015-08-07 15:14:46'
tags:
- craftsmanship
---

My vision of the software changed drastically when I started using a control version. First a bit of `svn`, and later `git`. The fact that you can create a *checkpoints* of your code is simply glorious. More later, when I started to feel more comfortable with `git` I started using `git tags` in combination with [semver versioning](http://semver.org/).

In these days, is very common use NodeJS package for whatever thing. JS is a tiny language with an archaic API, so you need packages all the time. And nothing bad about that, it's allow you have options.

When I write a package, I try to be very clear with the propose saying why I wrote the package and add all elements that the package need for be used: write a little documentation, license, use a semver versioning politic, provide a browser version, travis integration,... Now I do it *quasi*-automatically, but I had to learn how to do it.

![](http://i.imgur.com/SgdtZqq.jpg)

## Package routine

For economize the time, I adopt a package routine that I follow all time that I need to create a package. First of all, I created a my own terminal command to setup the basic scaffold of every package. I called it [generator-git](https://github.com/Kikobeats/generator-git) and is a [Yeoman](http://yeoman.io/) command for:

- Create a package based in a name. Check if the name is available in the npm registry.
- Create the basic folders scaffold and install basic testing dependencies.
- Using the project name, generate a `README.md` with the basic structure and badges. Also it adds a `LICENSE.md`.
- You can choose if you need a browser version and add the stuff necessary for create it. Now you can use `gulp` command for create a browser version using [Browserify](http://browserify.org/). Also it adds a section in the `README.md`.
- You can choose if you need a CLI version and add a basic code to invoke the dependency for use in the terminal.

![](https://i.imgur.com/PnjgSTj.gif)

This saves me a lot of time, seriously. Then I write tests and code of the package and release the first version (If I'm very sure that is stable I release `1.0.0`, in other case `0.1.0`). For do it, I use a little bash script that create a git tag version and push it in the master remote:

```bash
# git tag and push
# gtp <tag>
gtp() {
  command git tag -am "$1" $1 && \
  command git push --tags && \
  command git push origin master
}
```

Because is the first version of the software, In this case I also use `npm publish` (and also `bower register` if I created a browser version) for register the package, and now is ready to be used.

## Maintain routine

Once you have your project, start a new laborious task: maintain it. Laborious is not necessary the same of *hard*, but you need to put more attention in the details.

<center><blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Instead of Major.Minor.Patch say Breaking.Feature.Bugfix - that&#39;s <a href="https://twitter.com/hashtag/SemVer?src=hash">#SemVer</a> in a nutshell.</p>&mdash; Robert Muehsig (@robert0muehsig) <a href="https://twitter.com/robert0muehsig/status/623397900274561024">July 21, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></center>

A few months ago, I detected that I spent too much time doing it and I had to be aware of so many things when releasing the new version of my code. Sometimes committing human errors in the process, like create a tag version before exec the command to create the new browser build, forget update the changelog, update the new version in `package.json` but not in `bower.json`, and more stupid stuff. 

Then I took the decision to, such I spent a little of time automating the creation of the package, create something little but useful to economise the time to release software.

## Bump!

I created [Bumped](https://github.com/bumped/bumped#bumped) for resolved all this type of problems. 

It's works based ins a configuration file, similar to `jshint`or `jscs` called `.bumpedrc`, but in this case it's based in [CSON](https://github.com/bevry/cson#cson) instead of JSON for be more readable. And example of file is:

```json
files: [
  "package.json"
  "bower.json"
]

plugins:
  postrelease:

    'Compile browser version':
      plugin: 'bumped-terminal'
      command: 'gulp'

    'Generating CHANGELOG file':
      plugin: 'bumped-changelog'

    'Commit the new version':
      plugin: 'bumped-terminal'
      command: 'git add . && git commit -m "$newVersion releases"'
```

This is the file that I use in my [Acho](https://github.com/Kikobeats/acho) library. I declared the files to syncrhonizes and, using the command, I can stablish the same key value across the files. So, If I need to update something, I' can be sure that is updated in both files. Simply and saves time. No more edit files manually!

When I need to release a new version, I run `bumped release` command. In addition, it's possible to associate actions before and/or after the release. For do it, bumped use a tiny plugin system (like `yeoman` generators).

One thing about plugin system is that previously you don't need to install it: Just declare in the configuration file and bumped do the rest of the work. If the plugin is available in the npm registry, is enough.

This is the look using `bumped release` command with plugins:

<center><blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">releasing software like a pro <a href="http://t.co/hSfsZwpLuw">pic.twitter.com/hSfsZwpLuw</a></p>&mdash; Kiko Beats (@Kikobeats) <a href="https://twitter.com/Kikobeats/status/627041135408623616">July 31, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></center>

Then just I have to push in the remote branch. I integrate this step in the bumped configuration files, but I prefer do it manually.

Maybe not necessary every day, but I release software very often. Because the cost for me is near to 0 and the advantages of doing so are many. Now I added a `.bumpedrc` file in my yeoman generator and automatically is integrated in my package routine.