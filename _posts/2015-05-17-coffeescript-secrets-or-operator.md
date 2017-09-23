---
layout: post
title: 'CoffeeScript secrets: or= operator'
image: http://i.imgur.com/URHcs5Z.jpg
date: '2015-05-17 09:54:55'
tags:
- javascript
---

I'm sure that, like me, you are using this pattern in JavaScript for be sure about the value of a variable or assign one by default:

```
var helloName = function(name) {
  name = name || 'Kiko';
  console.log('hello' + name + '!');
};
```

Simple, right? if you don't provide a default value, the default is the value after `||` operator, in this case, `Kiko`.

For do this, in CoffeeScript you can use `or=` operator that have the same effect in less code.

```
helloName = (name) ->
  name or= 'Kiko'
  console.log "hello #{name} !"
```

Just it. It may seem a bit trivial, but can be useful when you need to check a large list of default value (and a little more semantic).

The only consideration is that must not be confused with `?=` operator most known as existential operator.

The main difference between the two operator is that `or=` is based in a short-circuit logic that executed or not its second operand based on the value of the first, meanwhile `?=` asks of the truth value checking with `null`. 

Let me show you the difference between a subtle and little example:

```
a = b = 0

# Because at this moment 0 is false, using || operator we exec the second operand too. Finally the value of a is 1.
a or= 1

# In this case b at this moment is 0, but the result of comparing 0 with null is false and the value of b is 0 at the end.
b ?= 1
```

*([compilation link](http://js2.coffee/#coffee/try:a%20%3D%20b%20%3D%200%0A%0Aa%20or%3D%201%3B%0Ab%20%3F%3D%201%3B))*


Another point of view is that because `?=` uses a condition and `or=` does not, exists a little difference in terms of CPU cost.

Another thing more: `or=` have the same behavior in CoffeeScript than `||=` in Ruby, an also you can use `||=` as `or=` in coffee :-)