---
layout: post
title: Application Indicators para Unity
date: '2012-10-28 07:06:22'
tags:
- computer-science
---

<p style="text-align:left;"><a href="http://es.wikipedia.org/wiki/Unity_(entorno_de_escritorio)">Unity</a> es la interfaz de usuario que trae como defecto las distribuciones de Ubuntu a partir de la versión 10.10. Ésta interfaz de usuario está basada  <a title="GNOME Shell" href="http://es.wikipedia.org/wiki/GNOME_Shell">GNOME Shell</a>, que es el sucesor de <a href="http://es.wikipedia.org/wiki/GNOME_Panel">GNOME Panel</a> y ha sido desarrollada por la empresa que hay detrás de Ubuntu, <a href="http://www.canonical.com/">Canonical</a>.</p>
<p style="text-align:left;">La interfaz se caracteriza por una barra lateral izquierda, una barra superior que se "funde" cuando ponemos una aplicación en fullscreen y la utilización de un Dash para realizar las tareas de búsqueda, lanzar aplicaciones, etc. Os dejo algunas extensiones para la interfaz que personalmente uso debido a que son muy cómodas para tener ciertos datos presentes en la barra superior.</p>
Hay un montón de indicadores que podemos instalar. Ésta es mi selección personal (tened en cuenta que cuando los instaléis tenéis que correrlos en el terminal para lanzarlos):
<h2><a href="https://launchpad.net/indicator-multiload" rel="nofollow">System Load Indicator</a></h2>
<a href="http://i.stack.imgur.com/2MPU0.png"><img alt="" src="http://i.stack.imgur.com/2MPU0.png" width="308" height="290" /></a>

[sourcecode language="bash"]
sudo add-apt-repository ppa:indicator-multiload/stable-daily
sudo apt-get update
sudo apt-get install indicator-multiload
[/sourcecode]
<h2><a href="https://launchpad.net/indicator-cpufreq" rel="nofollow">CPUFreq</a></h2>
<a href="http://i.stack.imgur.com/fdeBk.png"><img class="alignnone" alt="" src="http://i.stack.imgur.com/fdeBk.png" width="379" height="354" /></a>

[sourcecode language="bash"]
sudo apt-get install indicator-cpufreq
[/sourcecode]
<h2><a href="https://launchpad.net/indicator-sensors">Hardware Sensors Indicator</a></h2>
<a href="http://i.stack.imgur.com/SFwI3.png"><img class="alignnone" alt="" src="http://i.stack.imgur.com/SFwI3.png" width="223" height="176" /></a>

[sourcecode language="bash"]
sudo apt-add-repository ppa:alexmurray/indicator-sensors
sudo apt-get update
sudo apt-get install indicator-sensors
[/sourcecode]
<h2><a href="https://launchpad.net/indicator-sysmonitor">Sysmonitor Indicator</a></h2>
<a href="http://i.stack.imgur.com/XiNnR.png"><img class="alignnone" alt="" src="http://i.stack.imgur.com/XiNnR.png" width="313" height="30" /></a>

[sourcecode language="bash"]
sudo apt-add-repository ppa:alexeftimie/ppa
sudo apt-get update
sudo apt-get install indicator-sysmonitor
[/sourcecode]

Éstos son los que yo utilizo. Tenéis muchos más en la fuente de la noticia. <a href="http://askubuntu.com/questions/30334/what-application-indicators-are-available">Fuente</a>