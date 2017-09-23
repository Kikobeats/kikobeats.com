---
layout: post
title: Integrar la Ãºltima versiÃ³n de Eclipse con Linux
date: '2012-10-17 14:11:33'
tags:
- computer-science
---

<p style="text-align:left;">Eclipse es un excelente entorno de programación JAVA que puede operar tanto en Windows como en Linux. Como es costumbre, el instalador de Windows es coser y cantar, mientras que el de Linux, si queremos que quede bien tendremos que hacer algunas cosilla extras.</p>
Más que decir lo que hay que hacer, lo primero que voy a decir es lo que NO hay que hacer, y es que NO debemos instalar la versión de Eclipse que se encuentra en los repositorios de Ubuntu o de cualquier otra distro, ya que ésta versión será la estándar y por tanto, la que menos contenido tiene. Deberemos de la página oficial descargar la versión que mejor se nos adapte a nuestras necesidades. En caso de duda recomiendo bajar la versión '<strong>JAVA EE IDE</strong>' ya que es la más completa.

Dicho esto, empezamos este mini-tutorial teniendo en cuenta a priori que no tenemos ninguna versión de eclipse instalada en nuestro equipo.

1 - Descargamos Eclipse de la <a href="http://www.eclipse.org/downloads/">página web oficial</a>. (versión 32 ó 64 bits, según nuestro procesador). En el momento de la creación de éste tutorial la versión más reciente es <strong>Juno</strong>. Operaremos con ésa.

2 - Uno de los problemas más común en la instalación es instalarlo en una carpeta sin privilegios suficientes. Los entornos de programación necesitan de privilegios ya que hacen llamadas al núcleo del sistema. En Windows es normal instalarlos en la raíz del disco duro (C:). En Linux haremos algo parecido instalándolo en una carpeta llamada /opt/ (Si no la tenemos, la crearemos). Por ello, el siguiente paso es convertirse en superUsuario para llevar a cabo éstas tareas:
<p style="margin-left:80px;"><code> su -
</code></p>
3 - Extraemos el archivo descargado en la carpeta /opt. Podríamos extraerlo en una cualquiera y luego moverlo, pero es más elegante hacerlo todo en un comando:
<p style="margin-left:80px;"><code> tar -xvzf eclipse-jee-juno-SR1-linux-gtk-x86_64.tar.gz -C /opt
</code></p>
Ahora tenemos una carpeta con el eclipse en /opt/eclipse/. Qued darle permisos de lectura para que podamos ejecutar el programa:
<p style="margin-left:80px;"><code> chmod -R +r /opt/eclipse
</code></p>
4 - Nos queda linkear el programa con el sistema para que podamos invocarlo. para ello:
<p style="margin-left:80px;"><code> touch /usr/bin/eclipse
chmod 755 /usr/bin/eclipse
gedit /usr/bin/eclipse</code></p>
Y en la ventana que se nos abre pegamos lo siguiente:
<p style="margin-left:80px;"><code> #!/bin/sh
export ECLIPSE_HOME="/opt/eclipse"
$ECLIPSE_HOME/eclipse $*</code></p>
5 - Para aquellos que utilicen Gnome tendrán que hacer éste paso adicional para tenerlo integrado con el sistema:
<p style="margin-left:80px;"><code> gedit /usr/share/applications/eclipse.desktop
</code></p>
En la ventana que se nos abre pegamos lo siguiente:
<p style="margin-left:80px;"><code> [Desktop Entry]
Encoding=UTF-8
Name=Eclipse
Comment=Eclipse SDK 4.2.1
Exec=eclipse
Icon=/opt/eclipse/icon.xpm
Terminal=false
Type=Application
Categories=GNOME;Application;Development;
StartupNotify=true
</code></p>
Y ya está. Recordad que para que todo funcione bien tendremos que tener además instalada la máquina virtual de Java. No olvidéis tampoco instalar las propias actualizaciones del IDE de eclipse a través de la interfaz gráfica.