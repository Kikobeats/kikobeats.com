---
layout: post
title: Mover una instalaciÃ³n Wordpress de dominio
date: '2012-12-26 14:57:13'
tags:
- backend
---

Cuando mueves una instalación <strong>Wordpress</strong> de dominio, las urls de los archivos que hayas albergado en el antiguo dominio siguen apuntando a tu antiguo dominio. Tendrás que realizar un renombramiento en la BBDD para cambiar la URL de esos archivos y hacer que apuntes al nuevo dominio, que es en definitiva donde están situados los nuevos datos.

El renombramiento se hace a través de consultas SQL a la BBDD. Puesto que las tablas de Wordpress no contienen los mismo campos hay que hacer una serie de consultas.
<h3>Cambiar la URL en las opciones generales de Wordpress (fundamental)</h3>
<pre class="lang:mysql decode:true">UPDATE wp_options SET option_value = replace(option_value, 'http://zombeats.es', 'http://zombeats.es/nuevozb') WHERE option_name = 'home' OR option_name = 'siteurl';</pre>
&nbsp;
<h3>Cambiar la URL en las páginas de nuestro Wordpress</h3>
<pre class="lang:mysql decode:true">UPDATE wp_posts SET guid = replace(guid, 'http://www.anteriordominio.com',
'http://www.nuevodominio.com');</pre>
&nbsp;
<h3>Cambiar la URL en los archivos que hemos subido en nuestro Wordpress</h3>
<pre class="lang:mysql decode:true">UPDATE wp_posts SET post_content = replace(post_content, 'http://www.anteriordominio.com',
'http://www.nuevodominio.com');</pre>
&nbsp;

En principio con éstas tres consultas deberían estar resueltos todos los problemas derivados de cambiar de dominio la instalación :)

<strong>Actualización: </strong>De gran utilidad puede ser emplear el plugin <a href="http://wordpress.org/extend/plugins/velvet-blues-update-urls/">Velvet Blues Update URLs</a> ó <a href="http://wordpress.org/extend/plugins/search-and-replace/">Search &amp; replace</a>, que básicamente hace lo mismo pero a través de Wordpress, sin tener que meternos a consultas en SQL (por si nos da miedito :) )
<div id="plugin-description"></div>