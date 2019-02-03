---
layout: post
title: Tools for Maintainers
date: '2019-02-03'
image: https://i.imgur.com/nGcvLK1.jpg
---

## generator-git

![](https://i.imgur.com/ZcusO79.png)

I created [generator-git](https://www.npmjs.com/package/generator-git) 4 years ago and it was my first way for automatizing my daily workflow.

In those moments my need was created the necessary scaffold for publishing small [npm](https://www.npmjs.com/~kikobeats) packages.

My code style evolved with the passage of the time and that was reflected in `generator-git` as well

Nowadays, it supports different libraries and settings and still, I use it.

## automate-release

![](https://i.imgur.com/O5bKLQ9.png)

[automate-release](https://github.com/Kikobeats/automate-release) is a recent addition into my workflow.

The idea behind the project is automatize some maintenance stuff associated with your projects for removing as much as possible the human factor.

Let me an example: When I created a project, I usually connect it with [greenkeeper](https://greenkeeper.io/) to ensure keep the dependencies of the project up to date.

The service will create a new PR every time it detects one of the dependencies of the project has been updated. Then, if your tests pass on green you can conveniently merge the PR a release a new version of your project.

Although this sounds a good idea, if you have a lot of projects, it adds you a lot of noise.

![](https://camo.githubusercontent.com/974f3751150c8f4a5cfe6892ab26ef5873f3f27a/68747470733a2f2f692e696d6775722e636f6d2f7a4548346841382e706e67)

That's the thing that [automate-release](https://github.com/Kikobeats/automate-release) solves: Remove me (*the human factor*) from the equation.

When a PR is integrated and your tests pass on green, automatically a new version of your project will be released with all release things related, this means:

- Increment the semver version properly.
- Generate a git tag.
- Append release notes into CHANGELOG.
- Add release notes into GitHub/GitLab release.
- Publish it on NPM.

Best of all, `automate-release` has been designed to make it easy to integrate with a current project, making possible use `generator-git` and `automate-release` together.

## scritch

I recently discovered [scritch](https://github.com/jamiebuilds/scritch) and I started loving it.

It's no the first time I see a tool with that purpose. I remember seeing the same from GitHub and Slack engineers, but the tool was written in Ruby and more difficult to extend.

Also, `scritch` allows you to define scripts in any scripting language, that's super cool.

## Others

I included in this section things that I have not tried yet but what I would use if I had the opportunity.

- [hygen](https://github.com/jondot/hygen) – It generates specific scaffolding for projects. A good thing to have into big projects with multiple people.
- [plop](https://github.com/amwmedia/plop) – similar to `hygen`, it looks with better terminal UI.
- [listr](https://github.com/SamVerschueren/listr) – A way for creating a terminal list of steps. That's superb if you have an expensive deploy and you want to create a visual feedback (eg, deploying scripts).
