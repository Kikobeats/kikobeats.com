---
layout: post
title: Improve your OOP style
date: '2014-03-13 07:13:07'
tags:
- craftsmanship
---

<center>![](http://i.imgur.com/iJijUXU.jpg)</center>

1. Use only one level of indentation per method. If you need more than one level, you need to create a second method and call it from the first. This is one of the most important constraints in the exercise.

2. Don't use the 'else' keyword. Test for a condition with an if-statement and exit the routine if it's not met. This prevents if-else chaining; and every routine does just one thing. You're getting the idea.

3. Wrap all primitives and strings. This directly addresses "primitive obsession." If you want to use an integer, you first have to create a class (even an inner class) to identify it's true role. So zip codes are an object not an integer, for example. This makes for far clearer and more testable code.

4. Use only one dot per line. This step prevents you from reaching deeply into other objects to get at fields or methods, and thereby conceptually breaking encapsulation.

5. Don't abbreviate names. This constraint avoids the procedural verbosity that is created by certain forms of redundancy.