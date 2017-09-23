---
layout: post
title: JavaScript tools to build interfaces
image: http://i.imgur.com/s7B6Nsm.png
date: '2015-01-26 11:46:00'
tags:
- javascript
- frontend
---

Transform a user interface concept into code is a task that can be resolved of different ways. The problem is how you organize your code that make scalable, easy to change and easy to maintain.

Now all is more easy in the browser. New techonologies in the client side are appearing and we can create things more easy. So we go to analyze the top libraries and top to manipulate the DOM for creating modern webApps Applications.

![](http://i.imgur.com/tGSXA94.png)

## [Polymer](https://www.polymer-project.org/)

Polymer project is hosted by Google that unify [W3C specification](https://github.com/w3c/webcomponents) for use webcomponents in the client-side.

![](http://i.imgur.com/5yWwXLz.png)

The most important of this feature is **Shadow DOM**, that make possible manipulate the DOM directly from JavaScript.

Also exists a set of complementary tools that you can use with polymer, such as [material design integration](https://www.polymer-project.org/docs/elements/material.html) and [search for custom elements](http://customelements.io/).

The mainly problem of the project is that you need to load a polyfill (~120kb) for support Web Components specification in your browser because the support of this new feature is a little poor.

![](http://i.imgur.com/N7On6SX.png)

Oficially the status of the project is *dev preview*, so is nice for little projects and prepare your body for the future, but definetly not completely ready for production.

![](http://i.imgur.com/IMW6CJs.png)

## [React](https://facebook.github.io/react/)

React is the approach by Facebook and Instragram engineer team. The main different between React and Polymer is that React use a **Virtual DOM** instead of **Shadow DOM**.

![](http://i.imgur.com/W8K6jHe.png)

Basically in **Virtual DOM**, the DOM of the elements doens't really exist. It is manipulated in memory diffing the DOM tree and render after changes. If you view the code under a page built under ReactJS you don't see anything. So actually it is not the problem. The problem is related when the search scrappers such as Google or Bing (for say something, don't kill me) try to index your HTML and this simply doesn't exist. 

To avoid this, React does something very intelligent: Send the view from the server and create the DOM in the client. This is the second different respect to polymer in relation with the Virtual DOM.

This approach is very nice, in special when you have a mobile client because you are moved the heavy part of the process in the backend, so your client doesn't need the make effort.

The cost of React in the frontend is a little more expensive than Polymer (~130kb). The problem in this point is that polymer try to implement future standard, so in the future doesn't need the polyfill but React support is a custom solution. 

Also is in *dev preview*.

![](http://i.imgur.com/30EFIi7.png)

## [Atoms](http://atoms.tapquo.com)

[Atoms](https://github.com/tapquo/atoms) is a good tool/library that I used during a time.

The way that atoms structured the logic form to create a components is using a chemical equivalence: an atom is the element more basic (for example, an input), an molecule is a group of atom (for example a form) and a organism is a set of molecules (the views of your applications). This makes that you can structure your code very logic and easy to understand.

![](http://i.imgur.com/6d2OnWH.png)

This approach is inspired in the article [Atomic Design written by Brad Frost.](http://bradfrost.com/blog/post/atomic-web-design/).

The project shared the vision with Polymer approach. At this moment use mustache template engine for render views in the client, but the idea is in the future have a native support. You can create a real HTML5 webApps, using adequately HTML5 tags.

I feel very comfortable under Atoms. One of the most nice features is the editor online for prototype websites. It's so cute and accelerates the development!

The size of the core is very little (~38kb). The project provide you a [set of elements for build webApp](https://github.com/tapquo/atoms-app) and it is really trivial to customize the style of an application.

The only bad part in this project is that need a better open source ecosystem. Have a [little documentation](https://github.com/soyjavi/atoms-documentation) but need more examples and showcase of application in production. 

In general, more people need to discover the project for feel the power.

![](http://i.imgur.com/GsBYh36.png)

## [Meteor](http://meteor.com)

Meteor is a framework instead of a tool such as Polymer or React, but I think that can be included because his template engine is reactive. It uses a template engine similar to handlebars called [spacebars](https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md) and combine it with other useful tools in the meteor ecosystem as [Blaze](https://www.meteor.com/blaze) for reactivy or [Tracker](https://www.meteor.com/tracker) for reload the view on demand.

You can use [Blaze out-of-box](http://codepen.io/imslavko/pen/bcxus?editors=100), but the important decision here is what workflow do you want to have. The philosophy under React and Polymer use a Flux Architecture Application, where you can "build" your own framework using a set of tools.

On the other hand, Meteor is a very nice JavaScript framework with the some interesting features: You can share the same code between client and side, uses by default websockets for the communication ([DDP](https://www.meteor.com/ddp)), you can access to the dabatase in real time in the client-side with [MiniMongo](https://www.meteor.com/mini-databases),... definetly he puts together a set of good modern techonologies. 

The documentation of the project is one of the best example about how to create a succesful open source project. You have many examples and resources as [discovermeteor](http://discovermeteor.com/) or [meteorHacks](https://meteorhacks.com/).

Personally I'm very happy using meteor in some projects. Depends of your opinion and of the project where you can to apply.

![](http://i.imgur.com/0f6RlYB.png)

## [Riot](https://github.com/muut/riotjs)

You can build nice webApps and mobile applications using React and Polymer from zero, but sometimes you want to use a WebComponents approach in scenarios that are already in production, or you can use it in a specific section, not over all the page.

Riot is a little library (~2.5kb, awesome) that provide the necessary code that make that your browser support Custom HTML Tags, Event handler and data binding.

It is inspired in React and use a Virtual DOM approach, but the size of the library in production is significantly more little:

![](http://i.imgur.com/DIbi5lp.png)
![](http://i.imgur.com/XmEFchU.png)

If you [compare](https://muut.com/riotjs/compare.html) a piece written in React and later with Riot is very similar and more human readable. Also it's look that a mature project (the current last stable version is 2.x).

Maybe it lose in the part of SEO/Web Scrapping but depend of the use that you do it of him can be a good solution for determinate problems. The good news in this point that this vision is in the [roadmap](https://muut.com/riotjs/faq.html).

![](http://i.imgur.com/oHvVJLo.png)

## [Ractive](http://ractivejs.org)

Reactive was orignally produce news applications. When I discover this library I only can say: wow. I find it very natural to use, and looks like a fusion between the best parts of atoms and React.

I recommend do the [tutorial](http://learn.ractivejs.org/hello-world/1/) and have [plugins](http://docs.ractivejs.org/latest/plugins) for use together with other famous libraries and frameworks (like Backbone). 

The bad part is that it is heavy (~450kb). Maybe this project is focused in created something from zero without dependencies. A good point is that you need a precompiler to put your code in production. The dev preview (0.6.x) is another important point to consider using it in production.