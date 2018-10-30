---
layout: post
title: Parameter vs Argument
image: http://i.imgur.com/l7qBiO8.jpg
date: '2015-12-10 09:31:57'
tags:
- computer-science
---

```javascript
// Here's the parameter!
function greet (name) {
  console.log('Hello', name)
}

// Here's the argument
greet('Kiko')
```

Also remember that in JavaScript each function have implicit the object [`arguments`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments).

Thanks [I Think I Know What You're Talking About, But I'm Not Sure @ Jennifer Wong](https://www.youtube.com/watch?v=j3vWXJ2Vgd4) talk for reminding me!
