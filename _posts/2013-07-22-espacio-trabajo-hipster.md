---
layout: post
title: El espacio de trabajo de un hipster
date: '2013-07-22 15:24:49'
tags:
- computer-science
- frontend
- backend
---

Cuanto menos hagas con menos, mejor. <strong>do more with less</strong>. Cuanto menos código necesites para hacer lo mismo, mejor. Cuanto menos tiempo tardes, mejor.

Hoy en día el que programa en HTML puro es porque quiere, pues podría hacer los mismo con <a href="http://jade-lang.com/">Jade</a> de manera mucho más minimalista y más limpia. Del mismo modo que el que escribe CSS puro es porque quiere, sin poder utilizar las ventajas que le ofrece un buen coprocesador como puede ser <a href="http://sass-lang.com/">SASS</a>, <a href="http://learnboost.github.io/stylus/">Stylus</a> o <a href="http://lesscss.org/">less</a>: Utilización de variables, simplificación de la sintaxis,....

¿Y para Javascript, el lenguaje más feo de la historia? Pues <a href="http://coffeescript.org/">Coffescript</a>, algo menos feo y más funcional.
<h1>Me has hecho sentirme sucio. ¿Cuál es el buen camino?</h1>
Toca poner a punto tu herramientas de trabajo. Liarse a instalaciones, actualizaciones, reboot and boots. Espero que por lo menos tengas <a href="http://kikobeats.com/tag/sublime-text-2/">Sublime Text 2</a> y <a href="http://kikobeats.com/tag/guard/">Guard</a> instalado, porque sino, te toca hacer un poco de trabajo extra.

<a href="http://kikobeats.com/content/images/old/2013/07/nodejs-npm.png"><img class="aligncenter" alt="nodejs-npm" src="http://kikobeats.com/content/images/old/2013/07/nodejs-npm.png" width="320" height="240" /></a>
<h2></h2>
<h1>Node.js y NPM</h1>
Ya sé que hasta ahora no había dicho nada de <strong>NodeJS</strong>, pero es que la mayoría de las cosas que queremos instalar se hacen a través del gestor de paquetes de <strong>NodeJS</strong>, más conocido como <strong>npm</strong>. Así que conviene instalar la parejita antes de nada.
<h2>Instalar Node.js</h2>
Tan fácil como acudir a la sección de <a href="http://nodejs.org/download/">descargas</a> de la página oficial de Node.js
<h2>Instalar npm</h2>
<pre class="lang:sh decode:true">sudo curl http://npmjs.org/install.sh | sh</pre>
&nbsp;
<h2>Instalar Jade</h2>
<pre class="lang:sh decode:true">sudo npm install jade -g</pre>
&nbsp;
<h2>Instalar Stylus</h2>
En verdad me gusta más otros coprocesadores como es SASS, pero éste sigue más la línea del minimalismo que estamos buscando :P
<pre class="lang:sh decode:true">sudo npm install stylus -g</pre>
&nbsp;
<h2>Instalar Coffescript</h2>
<pre class="lang:sh decode:true">sudo npm install -g coffee-script</pre>
&nbsp;
<h1><a href="http://kikobeats.com/content/images/old/2013/07/tutorial_rvm.png"><img class="size-full wp-image-792 aligncenter" alt="tutorial_rvm" src="http://kikobeats.com/content/images/old/2013/07/tutorial_rvm.png" width="230" height="220" /></a></h1>
<h1>Ruby y RVM</h1>
No me pongas esa cara. Te dicho que la mitad de cosas se instalaban a través del NPM, pero es que la otra mitad se instalan a través de gemas de Ruby. Conviene entonces que instalemos este lenguaje de programación y que instalemos el gestor RVM que no es más que un gestor de versiones del lenguaje y que nos ayudará a mantener el sistema al día.
<h2>Instalando RVM</h2>
RVM es un gestor de versiones para Ruby que nos permite tener varias versiones en una misma máquina.
<pre class="lang:sh decode:true ">curl -L https://get.rvm.io | bash -s stable</pre>
&nbsp;
<h2>Instalando la última versión de Ruby</h2>
Lo haremos a través de RVM. Primero, listamos las versiones que RVM puede instalar:
<pre class="lang:sh decode:true ">rvm list known</pre>
&nbsp;

Ahora elegimos la que nos interese:
<pre class="lang:sh decode:true ">rvm install ruby-head</pre>
&nbsp;

Por último la establecemos como versión por defecto:
<pre class="lang:sh decode:true ">rvm use 1.9.2</pre>
&nbsp;

Comprobamos que todo esté correcto:
<pre class="lang:sh decode:true ">Ruby -v</pre>
&nbsp;

<a href="http://kikobeats.com/content/images/old/2013/05/guard.png"><img class="size-medium wp-image-678 aligncenter" alt="guard" src="http://kikobeats.com/content/images/old/2013/05/guard-292x300.png" width="258" height="266" /></a>
<h1>Extendiendo Guard</h1>
Como ya <a href="http://kikobeats.com/desarrollo-web-mas-limpio-con-guard/">comenté</a> podemos utilizar Guard para convertir nuestros archivos creados a través de un pre-procesador.

Puesto que ya tenemos instalada la gema de Coffescript tan solo tendremos que instalar la de stylus:
<pre class="lang:sh decode:true ">gem install guard-stylus</pre>
&nbsp;

Y la de Jade:
<pre class="lang:sh decode:true ">gem install guard-jade</pre>
&nbsp;

<a href="http://kikobeats.com/content/images/old/2012/10/sublime_text_icon_21811.png"><img class="aligncenter size-full wp-image-465" alt="sublime_text_icon_21811" src="http://kikobeats.com/content/images/old/2012/10/sublime_text_icon_21811.png" width="256" height="256" /></a>

La guinda de pastel. Dejo una lista de los plugins que he encontrando cuanto menos "interesantes":
<ul>
	<li><a href="https://github.com/miksago/jade-tmbundle"><span style="line-height:13px;">Jade</span></a></li>
	<li><a href="https://github.com/P233/Jade-Snippets-for-Sublime-Text-2">Jade Snippets</a></li>
	<li><a href="https://bitbucket.org/Tumbo/bootstrap-jade">Bootstrap Jade</a></li>
	<li><a href="https://github.com/donpark/html2jade">HTML2Jade</a></li>
	<li><a href="https://github.com/billymoon/Stylus">Stylus</a></li>
	<li><a href="https://github.com/danro/LESS-sublime">LESS</a></li>
	<li><a href="https://github.com/nathos/sass-textmate-bundle">SASS</a></li>
	<li><a href="https://github.com/Xavura/CoffeeScript-Sublime-Plugin">Coffescript</a></li>
	<li><a href="https://github.com/castiron/sublime-jquery-coffee">jQuery snippets for Coffescript</a></li>
</ul>