---
layout: post
title: Convierte tu web en una aplicaciÃ³n mÃ³vil
date: '2013-08-10 06:20:00'
tags:
- frontend
---

Muchas veces queremos visionar una web desde un móvil y tablet y, aunque ésta sea <em>responsive design</em> no queda del todo integrada como tal en el dispositivo.

Apple pone a disposición de los desarrolladores una serie de tag en HTML con los que se puede alcanzar mejor integración con el dispositivo (Definir el icono para añadir un acceso directo, imagen que queremos que se muestre cuando abramos la "aplicación", esconder la barra de navegación....) que nos ayuda a conseguir que nuestra versión móvil parezca una aplicación nativa.

Las etiquetas HTML que hay que definir son:
<ul>
	<li><strong>view-port</strong>, para ajustar la escala en la que vemos la web en el dispositivo.</li>
	<li><strong>apple-mobile-web-app-capable</strong>, para esconder la barra de navegación en nuestra "aplicación web", es decir, para ejecutar la aplicación en modo pantalla completa.</li>
	<li><strong>apple-mobile-web-app-status-bar-style</strong>, que sólo se tiene que definir si se ha definido apple-mobile-web-app-capable.</li>
	<li><span style="line-height:13px;"><strong>apple-touch-icon-precomposed,</strong> para definir el icono para el acceso directo
</span></li>
	<li><strong>apple-touch-startup-image,</strong> para definir la imagen a cargar al principio al abrir una aplicación (Puede especificarse en algunos casos tanto la imagen con el dispositivo en vertical como en horizontal.</li>
</ul>
Y aquí el código con todas las etiquetas para cada dispositivo:

[gist]https://gist.github.com/Kikobeats/6192715[/gist]