---
layout: post
title: Coffescript y Sublime Text
date: '2014-01-01 18:51:55'
tags:
- computer-science
---

![](http://i.imgur.com/8d8803N.png)

Hasta ahora solo he tenido palabras bonitas para **Sublime Text 2**: un editor de código rápido y muy versátil, que mucho se aleja de un tradicional **IDE** como puede ser **Eclipse** (Aunque Java sin Eclipse no es NADA, si sigues leyendo sabrás por qué).

Durante este tiempo he estado aprendiendo sobre **Coffeescript**, aplicándolo sobre todo en proyectos de juguete para coger algo de soltura. Y la verdad es que la experiencia con **Sublime Text 2** ha sido **decepcionante**.

**Coffescript** es un lenguaje (el cual compila a **Javascript**) que orienta los objetos de una forma mucho más natural a como lo hace **Javascript** (entre otras cosas).

¿El problema? Precisamente ese. Al estar más orientado a objetos, te hace depender más del editor, sobre todo para autocompletar nombre de funciones, variables,... (¿Ahora entiendes la parte de Eclipse?).

Para empezar, **Sublime Text 2** no soporta nativamente **Coffeescript**, y por lo que he podido comprobar **Sublime Text 3**.

Para seguir, <del>puedes</del> debes [instalar un plugin para soportarlo](https://github.com/Xavura/CoffeeScript-Sublime-Plugin) (Hay muchos y se copian entre ellos, mejor ir a por el más mantenido). Hey, pero si eso resolviera el problema no estaría escribiendo esto ahora mismo. Completa a través de snippets y código que el editor va aprendiendo a través de lo que escribes, pero poco más. Seguimos estando lejos de esa propiedad de autocompletar funciones de objetos.

![](http://i.imgur.com/fSXHaFQ.jpg)

La solución que buscamos es un **code-analysis engine** al estilo de [TernJS](https://github.com/emmetio/sublime-tern). Pero me da a mí que si no viene ni por defecto con soporte para **Coffeescript** poco se puede pedir.

Al final he tenido que recurrir a un **IDE** ([WebStorm](http://www.jetbrains.com/webstorm/)) con las cosas buenas y malas que esto conlleva. La verdad es que no es lo que yo quería y sigo buscando alguna manera de poder tener ésta **feature** en **sublime** para poder volver a ser feliz y no sentirme sucio por dentro, pero de momento va a ser que no.

![](http://i.imgur.com/uspe2k2.png)

*Nunca te conformes...*


