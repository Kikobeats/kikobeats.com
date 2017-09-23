---
layout: post
title: Construyendo un Hackintosh basado en AMD (Parte I)
date: '2013-02-16 08:36:16'
tags:
- hack
---

Actualmente tengo Windows 7 y la verdad es que no pienso actualizar a la versión 8. Como tengo un Macbook Pro, es bastante follón tener programas en el mac y luego tener las versiones equivalentes de éstos programas en Windows. A eso, hay que sumarle que como Windows está basado en NTFS el sistema se deteriora muchísimo más rápida, es más proponso a sufrir ataques de seguridad, etc.

Vamos, que la voy a liar parda. Mi idea es instalar MacOS en el ordenador donde ahora tengo Windows, pero me da que no va a ser un proceso tan fácil cómo decirlo.
<h1>Mi hardware</h1>
<ul>
	<li><span style="line-height:12.98611164093px;"><strong>Procesador</strong>: AMD Phenom II x4 965</span></li>
	<li><strong>Placa base</strong>: Gigabyte GA-970A-UD3</li>
	<li><strong>Memoria principal</strong>: 2x G Skill F3-12800CL9-4GBXL y 2x G Skill F3-12800CL9-2GBXL</li>
	<li><strong>Memoria secundaria</strong>: SAMSUNG HD502HJ</li>
	<li><strong>Tarjeta gráfica</strong>: ATI Radeon HD 5850 1GB GDDR5</li>
</ul>
<h1>El principal Problema: el socket</h1>
Mi ordenador principal tiene un AMD Phenom II x2 965. Sí, socket AMD, y esto es un problema (y gordo). Si mi socket fuera Intel podría ahorrarme muchos problemas, pues es el socket con el que distribuyen los ordenadores de Apple. Pero no, aquí vamos a lo difícil, que siempre mola más que cueste. Además mi idea para el ordenador de sobremesa es que me durase bastante tiempo, por lo que no tengo intención de cambiar de socket (de CPU sí con el tiempo, pero no de socket :( )

Que no cunda el pánico. Aún así tengo entendido que se puede hacer un hackintosh, pero tendremos que basarnos en una distribución <em>un poco </em>más viejuna.
<h1>Recopilando información</h1>
En internet a miles de millones de sitios que te dicen cómo instalarlo con diferente hardware. Al principio puedes pensar que esto está bien, pero conformes vas navegando te puedes perder en el proceso de seleccionar una guía/post al que, a ciegas, hacer caso.

El principal atractivo de los sitios que he encontrado reside en que te dicen cómo elaborar tu hackintosh ya desde el proceso de selección de hardware (que sería la mejor manera de plantearlo) pero como hemos dicho que aquí vamos a lo difícil, el hardware ya lo tengo y es muy específico.

De entre todos los sitios que he encontrado me quedo con 3:
<ul>
	<li><a style="font-size:13px;line-height:19px;" href="http://www.tonymacx86.com/home.php">tonymacx86</a><span style="font-size:13px;line-height:19px;"> y </span><a style="font-size:13px;line-height:19px;" href="osx86project.org">OSX86.org</a><span style="font-size:13px;line-height:19px;"> son muy buenos sitios si queremos iniciar el proceso de tener un Hacktinosh desde el hardware.</span></li>
	<li><a style="font-size:13px;line-height:19px;" href="http://www.osx86.net/">OSX86.net</a>, el cual ofrece mucha información sobre la instalación en equipos AMD, así como utilidades y demás.</li>
</ul>
Navegando por OSX86.net me encontré con el <a href="http://iatkos.me/iatkos-project/">iAktos</a>. Éste proyecto consiste en modificar una instalación de MacOSX para hacerla compatible con más hardware, lo cual, en este caso, nos viene que ni pintado.

Por lo visto la versión más reciente compatible con mi socket es la 10.6.3. Encontré un <a href="http://www.insanelymac.com/forum/topic/278181-amd-1073-guide-experimental-only/">post donde se habla del proceso de instalación para la 10.7.3</a>, pero como está en fase experimental prefiero lanzarme a lo seguro. así que nada, ya tenemos el principio del camino marcado.

La versión del sistema facilitada por iAktos me "garantiza" (y lo pongo entre comillas porque no tengo ni idea de lo que va a pasar) que es compatible con mi socket, pero aún no sé qué va a pasar con la tarjeta gráfica ni la placa base. Sé que existen drivers para mi hardware pero no están incluidos en ésta instalación. Voy a tener que <em>trapichear </em>de alguna manera. Decido utilizar <a href="http://www.osx86.net/desktops/9746-guide-os-x-10-6-amd.html">ésta guía</a> como guía base para ir avanzando poco a poco en el proceso de instalación. Y a ver qué pasa.