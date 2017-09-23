---
layout: post
title: Sincroniza Adobe con Dropbox
date: '2013-05-11 15:25:06'
tags:
- computer-science
---

Adobe ha anunciado (y de hecho lo ha hecho) que va a retirar su versión Master Collection y que a partir de ahora se llamará Adobe Creative Cloud, la cual se apoya en un modelo de negocio basado en la nube. Entre las novedades de ésta versión está la sincronización de preferencias a través de la nube, pero esto puedes hacerlo con tu versión actual y utilizando Dropbox como nexo.

Tan fácil y sencillo como saber las rutas de la carpeta que quieres sincronizar, albergarla en Dropbox y crear un enlace simbólico. Las opciones de Adobe se guardan en la carpeta:
<pre class="lang:sh decode:true">/Users/username/Library/Preferences/</pre>
&nbsp;

Así que el enlace simbólico tiene que ser de la siguiente manera:
<pre class="lang:sh decode:true">ln -s /Users/username/Dropbox/AppData/photoshop/ ./Adobe Photoshop CS6 Settings
ln -s /Users/username/Dropbox/AppData/illustrator/ ./Adobe Illustrator CS6 Settings</pre>
&nbsp;

Hay que hacer un enlace por cada programa. Si vas a hacer <em>copypega </em>el código no olvides sustituir <span style="text-decoration:underline;">username</span> y asegurarte de que estás dentro de la carpeta indicada. También tendrás que asegurarte de que la ruta de Dropbox coindice con la mía.

Así te aseguras además tener a buen recaudo cosas como los brushes, Gradients, Materials.... ¡Ojalá lo hubiera hecho antes!

<strong>EDIT:</strong> Parece ser que ha Photoshop no le gusta que le pongan un enlace simbólico. En vez de hacer en enlace desde la raíz hay que hacerlo sobre cada carpeta/archivo de dentro directorio. Omitir los archivos que tienen la palabra "Optimized"