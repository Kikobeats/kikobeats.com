---
layout: post
title: Sincronizar Sublime Text 2 mediante Dropbox
date: '2012-11-01 20:34:38'
tags:
- computer-science
---

<h3><strong>Windows</strong></h3>
Para crear un enlace simbólico se utiliza el comando y el parámetro [sourcecode language="bash"] mklink /D "%APPDATA%Sublime Text 2Packages" "%USERPROFILE%DropboxSublime Text 2Packages" [/sourcecode] Entre comillas introducimos primero la carpeta fuente y después la carpeta destino (en este caso la de Dropbox). Si no os aclaráis con las variables del sistema utilizad rutas absolutas.
<h3><strong>Linux/Mac OS</strong></h3>
El procedimiento es el mismo, tan sólo que aquí el comando es <strong>ln -s</strong> [sourcecode language="bash"] ln -s ~/Dropbox/Apps/SublimeText2/Packages/ ~/Library/Application Support/Sublime Text 2/Packages [/sourcecode] Hay que tener en cuenta que ésta ruta puede no coincidir con la ruta de instalación de nuestro programa. Si queremos asegurarnos bien tan solo tenemos que ir a <strong>Preferences &gt; Browse Packages</strong>