---
layout: post
title: Different type of Collections in JavaScript
image: http://i.imgur.com/p4VwGtO.jpg
date: '2015-02-26 12:46:42'
tags:
- javascript
---

When you are using a programming language, you need use something for keep your data information. Someting as a *container*.

For do it you need to use [data structure](https://en.wikipedia.org/wiki/Data_structure), that defines a particular way to organizing the data.

Collection is a type of data structure that implement some kind of iterable interface and they internally use the same iteration method. This is easy to view in language like Java when exist a inheritance hierarchy defined by an interface.

In JavaScript is similar, but is less complete and, because is not possible define interfaces, we use the inheritance based in `Object  `.

## Object, Array and Functions

The first thing that you need to understand is that `everything` is a object in JavaScript unless primitives types, that are:

```
boolean, number, string, null, undefined
```

About the collections, basically an `object`, `array` and `function` are instance of object, so you can use as data structures. The difference how to internally the iteration is defined.

If you check functional libraries as [lodash](https://lodash.com/docs) you can see that exist method for collection and methods specific for arrays and objects. Exists little differences between them that determine how they should be iterated: For example, an array is a collection of element in order, while object is a collection of keys, and is not important the order.

But consider an `Object` (and `Functions`) as data structure at this moment with a ECMAScript6 is an error: Now we have a explicit class for do it.

## Map

A `Map` is the new ECMAScript6 data structure. You can use a `Object` as a `Map`, but this have some problems:

- An `Object` has a prototype, so there are default keys in the map. However, this can be bypassed using `map = Object.create(null).`

- The keys of an `Object` are `Strings`, where they can be any value for a `Map`. (At this point, `Object` more like `Dictionary` structure).

- You can get the size of a `Map` easily while you have to manually keep track of size for an `Object`.

## Set

This is another new ECMAScript6 data structure. Is the same that `Map`, but only can store for unique values.

## WeakMap & WeakSet

First we need to understand what is a [Weak Reference](https://en.wikipedia.org/wiki/Weak_reference) and how works the reference in JavaScript.

All things in JavaScript unless primitives types (remember the first lines of this posts) works with references. If you create a new object that reference another object, basically you are linking the reference, not copy the object into another new:

```js
var var1 = {}
var var2 = var1

var1.foo = 123
// => 123
var2.foo
// => 123
```

Basically a clone method that is very typical in other language doesn't exist natively.

When you use a `Map` or `Set`, internally the data structure is created using two arrays: One for store the `key` and one for store the `value` that is saved clone the value, not with linking method.

With `WeakMap` and `WeakSet` we use collections that store the `key` based in how works object natively: we are telling the garbage collector can remove the value if there is no reference.

Because of references being weak, WeakMap keys are not enumerable (i.e. there is no method giving you a list of the keys). If they were, the list would depend on the state of garbage collection, introducing non-determinism. If you want to have a list of keys, you should maintain it yourself.

A little example about the difference of behaivor between `Map` and `WeakMap`:

```js
var map = new Map()
// => {}
var foo = 'bar'
// => undefined
map.set('foo', foo)
// => {}
var wmap = new WeakMap()
// => {}
var obj = { foo: 'bar' }
// => undefined
map.get('foo')
// => 'bar'
foo = 'it was changed'
// => 'it was changed'
map.get('foo')
// => 'bar'
wmap.set(obj, 'bar')
// => {}
map.get('foo')
// => 'bar'
wmap.get(objt)
// => 'bar'
obj = { foo: 'test' }
// => { foo: 'test' }
wmap.get(obj)
// => undefined
```

## You need more?

![](http://i.imgur.com/wBQKyyv.png)

Maybe you throw at fault other data structures. What's happens with `Heap`, `List`, `MultiMap`? 

Of course you can create this data structures based in others, but are not available nativelly. I recommend use the library [collections](http://www.collectionsjs.com) that provide you more data structures and the native . 

But I miss more interesting structures such as [Tree](https://en.wikipedia.org/wiki/Tree_%28data_structure%29), [B-Tree](https://en.wikipedia.org/wiki/B-tree).

##### References

- [JavaScript values: not everything is an object](http://www.2ality.com/2011/03/javascript-values-not-everything-is.html)
- [Map MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Map)
- [WeakMap MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
