---
layout: post
title: JavaScript Event Loop
date: '2014-10-17 04:48:33'
tags:
- javascript
---

![](http://i.imgur.com/VTFXRtv.gif)

When you are interested in a better understanding of how internally JavaScript works, you think in the execution stack: how the process is loaded in memory and, when you call a function, each function has an independient space of memory.

When a process is loaded in memory, the process memory's is divided in different parts into the **memory stack**. This is a nice schema to understand how the memory divides your code based on your declarations (because *static variable* aren't the same than *local variable*, right?):

![](http://i.imgur.com/uqAtX5N.jpg)

And, when the main method of your code is executed, something like this happens:

![](http://i.imgur.com/iSB4ztA.gif)

Each method present in your main function have a different memory stack. While your code is being executed, each function expands the dynamic space of memory when each function is invoked.

This is a very common memory behavior across programming languages related with memory.

On the other hand, we have the **CPU stack**. It determines the order into the code is called.

Because JavaScript is a [event driven](https://en.wikipedia.org/wiki/Event-driven_programming) programming language, the way to expands methods in the stack are *slightly* different than others traditional static languages.

JavaScript as language needs a way to dispatch events. Event are [asynchronous](https://en.wikipedia.org/wiki/Asynchronous_communication). Another important aspect to consider is the fact that JavaScript is singled thread.

Then, what happens on the stack?

Basically, the functionality of the stack is the same, but it can be interrupted by events. The event loop manager decides what and when an event is executed, and puts the event on the stack.

![](http://i.imgur.com/jmUjJUZ.png)

It's a little difficult to imagine, but fortunately, [@philip_roberts](https://twitter.com/@philip_roberts) explains the concept very well in his talk at [JSConfeu](http://2014.jsconf.eu/):

<iframe width="630" height="390" src="//www.youtube.com/embed/8aGhZQkoFbQ" frameborder="0" allowfullscreen></iframe>

*([talk transcript](http://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html))*

The website that Philip uses to simulate stack state is [loupe](http://latentflip.com/loupe). Try to exec different codes and predict its performance :-)