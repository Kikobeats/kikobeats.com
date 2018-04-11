---
layout: post
title: 'Functions: The Right Way'
image: https://i.imgur.com/A8myRDv.jpg
date: '2015-11-27 22:07:32'
tags:
- craftsmanship
---

![](https://i.imgur.com/Ve9my2x.png)

> Every function or piece of code should have one entry point (input) and one exit point (output).
<cite>Edsger W. Dijkstra</cite>

## About the implementation

- Do one thing. Be small!
- One level of abstraction per function.
- One level of indentation per function.
- Be pure: the return value is only determined by its input values, without observable side effects.

## About readability

- Use Intention-Revealing Names: Choosing names that reveal intent can make it much easier to understand and change code.
- Avoid Disinformation: Avoid leaving false clues that obscure the meaning of code.
- Make Meaninful Dinstictions: It helps you group functions in different layers, from high to low level.
- Use Pronounceable names: If you are programming in a language, make possible read it.

## About the interface

- One or two arguments is nice, never more than three.
- Never flags arguments.

## About the workflow

- Sort function from high level to low level.
- Warning with wreck train (don't talk to strangers).
