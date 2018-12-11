---
layout: post
title: Design for Failing
date: '2018-01-15'
image: https://s3.envato.com/files/236735101/590.jpg
tags:
- product
---

> An error should make it obvious how to fix the problem
<a href='https://mobile.twitter.com/yifan_xing_e/status/1042294371763146752/'><cite>@runarorama</cite></a>

Errors are frustating.

But in the tech culture, the errors are everywhere all time.

[](https://twitter.com/GregorySchier/status/732830868562182144){:.card-preview data-size="large"}

When you design a error situation, think *how* the user feels under this context. A good error message should be:

- **Say what happened and why**.
- **Suggest a next step**.
- **Find the right tone**.

At the end of the day, errors are part of the product and the business culture for communicating something was wrong.

![](https://i.imgur.com/uTDI8tA.png)
<figcaption>Try Undos instead of prompting for confirmation.</figcaption>

Threy are not only for final user app: We need to communicate good errors message in all your developments layers.

[](https://twitter.com/yifan_xing_e/status/1042294371763146752){:.card-preview data-size="large"}

Think in the user experience behind read a developer that looks like:

![](https://i.imgur.com/ymk32Dw.png)
<figcaption>The raw error output looks difficult to read.</figcaption>

Compare with see the same error with the correct identation and well printed:

![](https://i.imgur.com/4oLFNNQ.png)
<figcaption><a href="https://github.com/AriaMinaei/pretty-error">pretty-errors</a> help you output good error presentations.</figcaption>

Print good errors is important. Presentation is important. Human eye match is important!

![](https://svr.js.org/demo.gif)
<figcaption><a href="https://svr.js.org">svr</a> printing minimal errors, using color and icons to have a visual impact.</figcaption>

Try to communicate **what** and **why** is happening with the less information possible, removing the unnecessary information for the current user abstraction layer.

![](https://i.imgur.com/Y0f50dC.png)
<figcaption>At <a href="https://microlink.io">microlink.io</a> we always suggest a point to get more information.</figcaption>

Always try to provide a point to get more information, making possible extend the context, specially if you are creating collaborative software.

## Libraries

- [whoops](https://github.com/Kikobeats/whoops) – It makes simple throw qualified errors.
- [clean-stack](https://github.com/sindresorhus/clean-stack) – Clean up error stack traces.
- [pretty-error](https://github.com/AriaMinaei/pretty-error) – It prints pretty errors, ideal for CLI tools.
- [err-sh](https://github.com/zeit/err-sh) – Microservice that forwards you to error messages.

## Bibliography

- [Say Hello to Error Hyperlinks](https://zeit.co/blog/err-sh).
- [The art of the error message](https://thestyleofelements.org/the-art-of-the-error-message-9f878d0bff80).
- [GoodUI, Good User Interfaces for higher conversion rates and ease of use](https://www.goodui.org).
- [Alert / Error Messages by Marcelo Graciolli](https://dribbble.com/shots/2990935-Alert-Error-Messages).
