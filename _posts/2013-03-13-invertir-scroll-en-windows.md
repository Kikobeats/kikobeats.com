---
layout: post
title: Invertir scroll en Windows
date: '2013-03-13 19:30:05'
tags:
- computer-science
---

<p style="text-align:center;"><em>(Sí, el logo es bastante feo, lo sé)</em></p>
<p style="text-align:left;">Una de las cosas que más me gustan de <strong>OSX</strong> es el scroll invertido. Me resulta mucho más natural (al menos en el <em>touchpad</em>) que el clásico scroll de mouse adoptado hasta ahora mayormente por el resto de sistemas operativos.</p>
<p style="text-align:left;">Hay una forma muy fácil de invertir el scroll en Windows, y, prácticamente, la mejor pues no hace falta instalar ningún software adicional. Añadir que invertir el scroll no es algo que se pueda hacer nativamente, o al menos, yo no lo he encontrado.</p>
<p style="text-align:left;"><strong>Autohotkey</strong> es un software para hacer auténticos atajos de teclado en Windows, desde lo más sencillo hasta lo más complejo que se te pueda ocurrir. Un script para invertir el scroll del ratón tendría la siguiente forma:</p>

<pre>#NoTrayIcon
WheelUp::
Send {WheelDown}
Return

WheelDown::
Send {WheelUp}
Return</pre>
<p style="text-align:left;">Como véis es tan explícito que no hace falta ni explicarlo.</p>
<p style="text-align:left;">La primera línea sirve para que no se muestre un icono de la aplicación en la bandeja del sistema que por defecto se muestra. Así, por ejemplo, si queremos que se ejecute el script nada más arrancar el ordenador tendríamos que ponerlo dentro de la carpeta de Todos los programas &gt; Inicio.</p>
<p style="text-align:left;"><span style="text-decoration:underline;"><strong>NOTA:</strong></span>  Autohotkey ofrece la posibilidad de crear un ejecutable del código de tal manera que no hace falta ni siquiera que instalemos el programa. Os dejo el ejecutable por si os queréis ahorrar los pasos anteriores.</p>
<p style="text-align:left;"><a href="http://kikobeats.com/content/images/old/2013/03/reverseScroll.zip">reverseScroll.zip</a></p>
<p style="text-align:left;">Por cierto, sigo trabajando en el Hackintosh y espero publicar noticias pronto :P</p>