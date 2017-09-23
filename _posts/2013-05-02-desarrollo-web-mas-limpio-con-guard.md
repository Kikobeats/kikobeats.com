---
layout: post
title: Desarrollo web mÃ¡s limpio con Guard
date: '2013-05-02 14:04:22'
tags:
- frontend
---

Una de las máximas en la programación es desarrollar con calidad en el menor tiempo. Si encima desarrollas para la web esto se complica un poco a la hora de probar diseños y ver que todo encaja a la perfección. Esto al final se traduce en miles de reload en el navegador, cambios minúsculos y constantes en la hoja de estilos, etc. Si quieres hilar fino, necesitas utilizar una herramienta como <strong>Guard</strong>.

Me gusta mucho Guard porque, aunque he visto herramientas similares que combinadas ofrecen la misma funcionalidad no es para nada la misma comodidad que ofrece instalar una única gema de Ruby.

Pero voy a dejarme ya de florituras y a decir qué hace realmente Guard. Con él podrás:
<ul>
	<li><span style="line-height:13px;">Convertir hojas de estilo de <strong>sass</strong> a <strong>css</strong> <em>al vuelo</em>
</span></li>
	<li>Convertir archivos <strong>CoffeScript</strong> a <strong>Javascript</strong> <em>al vuelo</em></li>
	<li>Realizar <strong>LiveReload</strong> sobre archivos que estás editando para la web y así poder verlos en vivo en el navegador.</li>
</ul>
La idea es establecer <em>guards</em> que conviertan de un lenguaje más limpio y sintácticamente más minimalista al lenguaje que se utiliza en la web.

Para hacer liveReload hace falta instalar un plugin en el navegador y el guard es un poco más complicado de armar (pero no mucho más!).

Además, para liveReload también hay una extensión llamada <a href="https://github.com/dz0ny/LiveReload-sublimetext2"><strong>Sublime Text 2</strong>: LiveReload</a> que hace el mismo efecto que la funcionalidad de la gema. Así que si utilizáis ese editor (que no veo ningún motivo por el que no deberíais utilizarlo :P) eso que os ahorráis.

http://www.youtube.com/watch?feature=player_embedded&amp;v=dRuiU6mjcFA

<a href="http://net.tutsplus.com/tutorials/tools-and-tips/guard-is-your-best-friend/">tutusplus.com</a> | <a href="https://github.com/guard/guard">GitHub</a>