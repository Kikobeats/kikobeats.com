---
layout: post
title: Module Driven Development
image: http://i.imgur.com/MeDXS49.png
date: '2015-07-13 12:48:21'
tags:
- craftsmanship
---

From since a time ago, I was thinking how to write code without repeating. [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) in all its glory, and believe in me when I tell you that it isn't always easy.

Think in an architecture of code so big, that's handle so many data and dispatch in different process. The code flows around the servers and programmers fights to keep the process alive under blocking errors. And every day the application is a little more big. Every day new code is put in production and could appear new problems and how much larger is the most difficult application to detect these errors. Normally we have to try different approach for localise the problems and fix it. We do not try to look like robots, implementing things under demand, but who has not felt like this before? 

![](http://i.imgur.com/HiFRfXA.jpg)

I dream with a future where the code can auto-reprogrammed. The code exists as entity and detects thats the behaviour with other entities is broken and solvent the problems dynamically. But just is a dream future, we have problems to resolve now.

Especially when you are working with large applications that have many business logic this problems appear. And yes, the architecture is big, and do many things, but you need to remember another programming principle: [Keep It Small, Stupid!](https://en.wikipedia.org/wiki/KISS_principle)

Big architecture is different to *WAT THE HELL IS DOING THE F*CK*NG CODE*.

Something can be big but composed for little pieces (in this case, of code) that connects the things. Like atoms in your body, and you in the earth, and the earth in the solar system, and you know, the universe is so big (and finite) but composed for the rest of things more small. Unimaginable small.

![](http://i.imgur.com/y6dCeXx.png)

An definitely code need to have a similar behaviour.

I'll confess a little secret: **I don't like framework.** I don't like the word framework and the and connotation of this word. And I tried to create my own framework... all time! You just need to wait a one day in the JS community from have another super awesome framework that solves problems that you haven't.

But the problem is that exists problem all the time! \*Rarely\* a problem is enough generic to handle it uniformly, because the way to resolve the problem could be a problem in your application. 

1. You have a problem with X.
2. You should the problem with Y.
3. Y interaction is broken with Z behaviour.
4. GO TO 1.

Each situation is unique. And the thing that you want to control is the **flow** between the different piece of code of your software. If your software is formerly by little piece of code (like UNIX philosophy) you only need define the interaction and the behaviour with your business logic. But if you have a framework that is more like an operative system you can start to read the documentation for your deprecated version.

<iframe src="https://player.vimeo.com/video/56219478" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

</br>

I recommend read [substak](http://substack.net/many_things) and [izs](http://blog.izs.me/post/48281998870/unix-philosophy-and-node-js) posts for find more concesible useful information about the topic.

We have to resolve problems with software. Don't make of the software another problem.
