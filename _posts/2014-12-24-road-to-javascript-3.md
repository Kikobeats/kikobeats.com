---
layout: post
title: 'Road to JavaScript #3'
image: http://i.imgur.com/wOl61r1.jpg
date: '2014-12-24 07:57:03'
tags:
- javascript
- database
---

![](http://i.imgur.com/Zf3fUxo.png)

## Truth, Equality in JavaScript and CoffeeScript

In JavaScript the truth of things is a little crazy.

````js
""           ==   "0"           // false
0            ==   ""            // true
0            ==   "0"           // true
false        ==   "false"       // false
false        ==   "0"           // true
false        ==   undefined     // false
false        ==   null          // false
null         ==   undefined     // true
" \t\r\n"    ==   0             // true
```

For reduce issues in **CoffeeScript** exists two helpers:

* `===` operator is by default `==` (strict comparison).
* The Existential Operator `?`. It is similar to Ruby operator and returns `true` unless a variable is `null` or `undefined`.

This is nice and is sugar for you, but warning with use existential operators with Boolean values:

```coffee
isUserExist = false
message = if isUserExist? then 'user exists!' else 'user doesn\'t exist!'
console.log message
# => "user exists!"
```

Because `isUserExist` is `false` and `?` operator only returns false with `null` and `undefined`!

Another example with `||=` and `?=` operator:

````coffee
# ||= operator
variable = false
variable ||= 'value'
variable # => 'value'

# ?= operator
variable2 = false
variable2 ?= 'value'
variable2 # => false
```

Always is important know the values that things in JavaScript can return. To know it I recommend check [truth, equality and JavaScript](http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript) and [Better JS equality table](http://strilanc.com/visualization/2014/03/27/Better-JS-Equality-Table.html).


![](http://i.imgur.com/OYs6tGi.png)

## JavaScript Application Architecture On The Road To 2015

A very nice post by [@addyosmani](http://twitter.com/addyosmani) explaning some tips and orientations for the future of the web.

Personally I think that 2015 is the year of databases anywhere, in special in the client side with projects very interesting as [PouchDB](http://pouchdb.com/) or [MeteorJS](https://www.meteor.com/).

About [ECMAScript 6 features](https://github.com/lukehoban/es6features) is true that some features are now available, but still need too much effort to be consolidated in this new year.

![](http://i.imgur.com/b2cPhQa.png)

## Front-end Job Interview Questions

A fun and useful repository for measuring yourself about your knowledge in technologies in the frontend (and maybe as preparation for jobs interview!). [Check it out in Github](https://github.com/h5bp/Front-end-Developer-Interview-Questions).

## Functional JavaScript

For a long time I am interested in have a code a little more functional approach.

If you are interested I recommend yout start with this awesome introductional video by [@javiervelezreye](http://twitter.com/javiervelezreye) (at this moment only available in spanish, sorry):

<iframe width="560" height="315" src="//www.youtube.com/embed/f4qQN6Mli-M?list=PLff2zYycYB8dDl_nPwUrDWzfPniicMzib" frameborder="0" allowfullscreen></iframe>

In your code, exist some useful libraries to have this approach. Remember that pure functional code cannot mutate, and do it in vanilla JavaScript is maybe impossible because is too dynamic code. For do it, I recommend you check [immutable-js by Facebook](https://github.com/facebook/immutable-js). Also provides you a type of collections that doesn't exist in JavaScript at this moment, as `Map` or `Set`.

Definetely the right way to learn more about Functional Programming is try a pure functional language. ClojureScript is the language, and maybe for a first introduction [Clojurescript Koans](http://clojurescriptkoans.com/) or [modern-cljs](https://github.com/magomimmo/modern-cljs) may be appropriate (Yes, I still want to try, where is my time?)

About this, another useful library for JavaScript inspired in ClojureScript is [transducers.js](https://github.com/jlongster/transducers.js) that allow you use Clojure approach in JavaScript. To understand better check the author's post [one](http://jlongster.com/Transducers.js--A-JavaScript-Library-for-Transformation-of-Data) and [two](http://jlongster.com/Transducers.js-Round-2-with-Benchmarks).

![](http://i.imgur.com/tXNSjAO.png)

## Client, memory and Databases

Recently [@rcsole_](http://twitter.com/@rcsole_) show me the power of levelDB. At this moment [@substack](http://twitter.com/substack) is writting a [little book](https://github.com/substack/leveldb-handbook), but still needs some time to get ready.

Anyway, the thing that most impacted me is how the projects is organize. Originally levelDB is a [Google Project](https://code.google.com/p/leveldb/) written in C++ but the community hacked the project and created [levelUp](https://github.com/rvagg/node-levelup), that is a levelDB handler for Node (and written in JavaScript, of course).

Now the project is more big: levelUP is high level wrapper, but also exist [levelDOWN](https://github.com/rvagg/node-leveldown), that is the part that speak with leveldb. This design allow you use other adapters as database. In definetely to use levelDB use [level](https://github.com/level/level) and [level-browserify](https://github.com/Level/level-browserify) in the browser that have the last levelUP and levelDOWN stable version.

For me, the the jewel in the crown is [levelgraph](https://github.com/mcollina/levelgraph), that use levelDB as Graph Database.

For know more the level project I recommend read [this series of post in DailyJS](http://dailyjs.com/2013/04/19/leveldb-and-node-1/) written by the author of some level repositories, [@rvagg](http://twitter.com/rvagg).

About this , [Rocksdb](https://github.com/facebook/rocksdb) is the Facebook version built using LevelDB and exists a fork called [level-rocksdb](https://github.com/Level/level-rocksdb) for use it.

Alternatively another key value database in momoery is [LokiJS](http://lokijs.org/#/).