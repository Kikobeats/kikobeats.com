---
layout: post
title: CoffeeScript Fat Arrow BUSTED
date: '2014-09-21 09:25:43'
tags:
- javascript
- computer-science
---

![](http://i.imgur.com/LScXF4p.png)

**CoffeeScript** is much more than a simple language that compile to Javascript: It makes my code clean, readable and more easy to maintainable.

I try to give my code pure object-oriented approach. With CoffeeScript is more easy, but sometimes is difficult too.

When you're handling callbacks you can not see clearly when to use `->` or `=>` and you need you study your code for understand better what's happens.

So, what is `=>` ?

`=>` as known as **fat arrow** is the language helper to bind in the reserved word **this** the external context to make accesible from the internal context.

In others (javascript) words:

```
var _this = this;

el.addEventListener("click", function(event) {
  return _this.handler(event);
});
```

and is very common in callbacks. But when you actually use?


	Rule 1: You Donï¿½t Need the Fat Arrow If You Donï¿½t Use: class, this, and @.
	Rule 2: Use the Fat Arrow when You Use @ in a Callback Definition in a Method.
	Rule 3: Donï¿½t Use Methods as Callbacks and Avoid the Fat Arrow Operator in All Other Circumstances.
    
maybe the three rules can be resume in:

	If callback and @, use arrow the fat.
    
or freak version:

	If callback? and callback.use '@' then => else ->
    

This is a very simple example that I like to remember with the rules:

<script src="https://gist.github.com/MichaelJosephKramer/6991081816575972a2ad.js"></script>

And ALWAYS remember that the key here is the **context**.

    Context in CoffeeScript, and JavaScript, generally follows a few simple rules. Take a function named makeManhattan:

    The context is the thing to the left of the dot. Here, bartender is the context.
    eg: bartender.makeManhattan()

    If thereï¿½s nothing to the left of the dot, the context is the global context.
    eg: makeManhattan()

    If the function is an event handler or callback, the context is the event owner or caller.
    eg: button.onClick(makeManhattan)

<space-medium></space-medium>

Source: [1](http://michaeljosephkramer.com/2013/03/12/the-simplified-fat-arrow-guide-for-coffeescript/) | [2](http://maxrohde.com/2014/03/20/coffeescript-fat-arrow-explained/)