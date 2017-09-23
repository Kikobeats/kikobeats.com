---
layout: post
title: The secrets between Gulp and Browserify
image: http://i.imgur.com/pxL7ZJG.jpg
date: '2014-12-12 16:30:31'
tags:
- javascript
---

If you are part of the Node.js community maybe for you the name of [subtack](https://github.com/substack) is familiar. It's one of the most active user of the community and authors of many projects and modules.

One of the most famous project (at this moment) is [Browserify](http://browserify.org), that allow you encapsulate your code and use `require` command in the browser for inject a dependency (as Node.js style). 

It's simply awesome: You can write JavaScript code that can be executed in the frontend (browser) and in Node.js (backend).

For create the build for encapsulate your code is very commonly use a task runner as Gulp. Maybe you know Grunt. Gulp is the new Grunt. So fast. Much Hipster. Very simple.

You can use a gulp task for create the build, but the problem is that browserify documentation for this simply doesn't exist. the code is good, the project is awesome but the documentation can be improve.

Browserify doesn't need a `gulp-browserify` because you can do the action with the standard API that  support streams (*more or less*). It's a little tricky and I want to share the result because I had ask substack for help about how to do it. The code is here:

<script src="https://gist.github.com/Kikobeats/0c65834a279b91516179.js"></script>

very bad code, right? You need to use `on` event to know when the bundle is available and chain next task for the code here. Another thing is that you need to use `vinyl-source-stream` for make compatible gulp streams with browserify output. I said that is a little tricky. But works!

