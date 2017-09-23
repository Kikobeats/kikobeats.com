---
layout: post
title: 'Scope and Context: Together but not mixed'
image: http://i.imgur.com/4bNt4y9.jpg
date: '2015-12-02 21:14:55'
tags:
- javascript
---

## About Context

> Context is related to objects. It refers to the object within which a function is executed.

* When you use the `new` keyword in front of a function call, the context is the new `Object`.

* When you execute a `Function` using `.call` or `.apply`, the context is the first argument.

* If a `Function` is called as object property (like `obj.fn`) then is executed in the context of the `Object`.

* If any of this rules don't match with your case, the `Function` is executed in the global context.

## About Scope

> Scope has to do with the the visibility of variables. In JavaScript, scope is achieved through the use of functions

* Each function creates a scope, and the only way to create an scope is defining a `Function`.

* The life cycle of an variable exists in the most external scope that the variable has been assigned.

* Out of his scope, a variable is invisible.

Read in the [CoffeeScript Book by Javi JimÃ©nez](https://leanpub.com/coffeescript).

Quotes from [Kevin Chisholm](http://blog.kevinchisholm.com/javascript/difference-between-scope-and-context/) blog.