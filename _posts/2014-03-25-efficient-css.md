---
layout: post
title: Efficient CSS
date: '2014-03-25 14:33:02'
tags:
- frontend
---

![](http://i.imgur.com/0b58qqE.jpg)

*Selectors have an inherent efficiency, and to quote Steve Souders, the order of more to less efficient CSS selectors goes thus:*

* ID, e.g. #header
* Class, e.g. .promo
* Type, e.g. div
* Adjacent sibling, e.g. h2 + p
* Child, e.g. li > ul
* Descendant, e.g. ul a
* Universal, i.e. *
* Attribute, e.g. [type="text"]
* Pseudo-classes/-elements, e.g. a:hover

### Tools

* [Specificity Calculator](https://specificity.keegan.st/)
* [CSS Diner](http://flukeout.github.io/#)

### Resources

* [Writing efficient CSS selectors](http://csswizardry.com/2011/09/writing-efficient-css-selectors/)
* [Efficiently Rendering CSS by CSSTricks](http://css-tricks.com/efficiently-rendering-css/)
* [Writing efficient CSS @ Mozilla developer](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS)
