---
layout: post
title: The Principles of Good Programming
image: http://i.imgur.com/GVWpiWW.jpg
date: '2014-12-02 09:10:57'
tags:
- craftsmanship
---

## [DRY - Don't repeat yourself](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

This is probably the single most fundamental tenet in programming is to avoid repetition. Many programming constructs exist solely for that purpose (e.g. loops, functions, classes, and more). As soon as you start repeating yourself (e.g. a long expression, a series of statements, same concept) create a new abstraction. 

## [Abstraction Principle](http://en.wikipedia.org/wiki/Abstraction_principle_(programming)).

Related to DRY is the abstraction principle each significant piece of functionality in a program should be implemented in just one place in the source code. 

## [KISS - Keep it simple, stupid!](http://en.wikipedia.org/wiki/KISS_principle).

Simplicity (and avoiding complexity) should always be a key goal. Simple code takes less time to write, has fewer bugs, and is easier to modify. 

## [YAGNI - You aren't going to need it](http://en.wikipedia.org/wiki/YAGNI).

You should try not to add functionality until you need it. 

## [Do the simplest thing that could possibly work](http://c2.com/xp/DoTheSimplestThingThatCouldPossiblyWork.html).

A good question to ask ones self when programming is What is the simplest thing that could possibly work? This helps keep us on the path towards simplicity in the design.

## [Don't make me think](http://www.sensible.com/dmmt.html).

This is actually the title of a book by Steve Krug on web usability that is also relevant in programming. The point is that code should be easily read and understood with a minimum of effort required. If code requires too much thinking from an observer to understand, then it can probably stand to be simplified.

## [Open/Closed Principle](http://en.wikipedia.org/wiki/Open_Closed_Principle).

Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification. In other words, don't write classes that people can modify, write classes that people can extend.

## [Write Code for the Maintainer](http://c2.com/cgi/wiki?CodeForTheMaintainer).

Almost any code that is worth writing is worth maintaining in the future, either by you or by someone else. The future you who has to maintain code often remembers as much of the code, as a complete stranger, so you might as well always write for someone else. 

A memorable way to remember this is *Always code as if the person who ends up maintaining your code is a violent psychopath who knows where you live.*

An extra point of view is *Write code that you can maintain*.

## [Principle of least astonishment](http://en.wikipedia.org/wiki/Principle_of_least_astonishment).

The principle of least astonishment is usually referenced in regards to the user interface, but the same principle applies to written code. Code should surprise the reader as little as possible. The means following standard conventions, code should do what the comments and name suggest, and potentially surprising side effects should be avoided as much as possible. 

## [Single Responsibility Principle](http://en.wikipedia.org/wiki/Single_responsibility_principle).

A component of code (e.g. class or function) should perform a single well defined task.

## [Minimize Coupling](http://en.wikipedia.org/wiki/Coupling_(computer_programming).

Any section of code (code block, function, class, etc) should minimize the dependencies on other areas of code. This is achieved by using shared variables as little as possible.

*Low coupling is often a sign of a well-structured computer system and a good design, and when combined with high cohesion, supports the general goals of high readability and maintainability*.

## [Maximize Cohesion](http://en.wikipedia.org/wiki/Cohesion_(computer_science)).

Code that has similar functionality should be found within the same component.

For remember this also is useful have present [TellDon'tAsk](http://martinfowler.com/bliki/TellDontAsk.html) principle.

## [Hide Implementation Details](http://en.wikipedia.org/wiki/Information_Hiding).

Hiding implementation details allows change to the implementation of a code component while minimally affecting any other modules that use that component. 

## [Law of Demeter](http://en.wikipedia.org/wiki/Law_of_Demeter).

Code components should only communicate with their direct relations (e.g. classes that they inherit from, objects that they contain, objects passed by argument, etc.).

##[Avoid Premature Optimization](http://en.wikipedia.org/wiki/Program_optimization).

Don't even think about optimization unless your code is working, but slower than you want. Only then should you start thinking about optimizing, and then only with the aid of empirical data. 

*We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil*.

## [Code Reuse is Good](http://en.wikipedia.org/wiki/Code_reuse).

Not very pithy, but as good a principle as any other. Reusing code improves code reliability and decrease development time.

## [Separation of Concerns](http://en.wikipedia.org/wiki/Separation_of_concerns).

Different areas of functionality should be managed by distinct and minimally overlapping modules of code. 

## [FIRST](http://addyosmani.com/first/)

Keep it (F)ocused.
Keep it (I)ndependent.
Keep it (R)eusable.
Keep it (S)mall.
Keep it (T)estable.

[@ The Principles of Good Programming](http://area.autodesk.com/blogs/chris/the_principle_of_good_programming)