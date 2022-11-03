---
layout: post
title: How to improve a program perfomance
date: '2021-05-25'
image: /images/how-to-improve-a-program-perfomance/header.jpeg
---

Essentially you have to do the following things, in a loop:

- Measure. The first measure should be done before any change, the second after the change. Don't tune for speed until you've measured, and even then don't unless one part of the code overwhelms the rest.

- Start doing measurement from big granularity (e.g., HTTP response time) and moves to low granularity (e.g., DNS Lookup + TCP Connection + TLS Handshake + Content Transfer) to find the real place where improvement can make the difference. Always keep [Amdahl's law](https://en.wikipedia.org/wiki/Amdahl's_law) on mind.

- Be careful with logging systems: a lot of logs are bad, but little is worse. You have to find the right balance and be possible to vary the log level you want over the time.

- Once you have your own software measured and under control, you can be continuing doing improvements from top to down software layers. That includes software dependencies, engine versions, or the operative system. Any place could be a good place for improvement.

## Bibliography

- [Rob Pike's 5 Rules of Programming](https://users.ece.utexas.edu/~adnan/pike.html)
