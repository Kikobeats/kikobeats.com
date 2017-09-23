---
layout: post
title: CÃ³mo integrar Sublime Text 2 con Linux
date: '2012-10-04 17:38:03'
tags:
- computer-science
---

Sublime Text 2 se ha vuelto uno de los mejores editores multiplataformas. Es por ello que me gusta utilizarlo tanto en windows como en linux, siendo en éste último SO la instalación un poco más complicada, pero nada del otro mundo.

Descargamos <a href="http://www.sublimetext.com/2">Sublime Text 2</a> (Ya sea por un wget o desde la página) en 32 ó 64 bits y lo descomprimimos:
<p style="padding-left:30px;"><code>tar xf Sublime Text 2 Build 2181 x64.tar.bz2</code></p>
Movemos la carpeta a un ubicación apropiada, por ejemplo, /usr/lib:
<p style="padding-left:30px;"><code>sudo mv Sublime Text 2 /usr/lib/</code></p>
Si hemos movido la carpeta a un lugar diferente a /usr/bin/ tendremos que crear un enlace simbólico para que podamos invocar al programa desde el terminal:
<p style="padding-left:30px;"><code>sudo ln -s /usr/lib/Sublime Text 2/sublime_text /usr/bin/sublime</code></p>
Si trabajamos con Unity, deberemos crear el lanzador. Para ello:
<p style="padding-left:30px;"><code>sudo sublime /usr/share/applications/sublime.desktop</code></p>
<code></code>y pegamos el siguiente código:
<p style="padding-left:30px;"><code>[Desktop Entry]
Version=1.0
Name=Sublime Text 2
# Only KDE 4 seems to use GenericName, so we reuse the KDE strings.
# From Ubuntu's language-pack-kde-XX-base packages, version 9.04-20090413.
GenericName=Text EditorExec=sublime
Terminal=false
Icon=/usr/lib/Sublime Text 2/Icon/48x48/sublime_text.png
Type=Application
Categories=TextEditor;IDE;Development
X-Ayatana-Desktop-Shortcuts=NewWindow
[NewWindow Shortcut Group]
Name=New Window
Exec=sublime -n
TargetEnvironment=Unity</code></p>
&nbsp;

<code></code>
Establecemos sublime como editor de texto predeterminado. Para ello ejecutamos el siguiente comando:
<p style="padding-left:30px;"><code>sudo sublime /usr/share/applications/defaults.list</code></p>
<code></code>y cambiamos todas las ocurrencias de <strong>gedit.desktop</strong> por <strong>sublime.desktop</strong>.

Personalmente utilizo Sublime tanto en Windows como en Linux manteniendo la misma configuración en ambos sistemas. Me gusta porque tiene muchísimos atajos de teclado y se puede extender sus funcionalidades instalando nuevos paquetes.

Si queréis aprender cosas al respecto, os recomiendo ver éste vídeo de <a href="https://twitter.com/soyjavi">@soyjavi</a> donde lo explica todo muy bien:

http://youtu.be/RUVbvxqFg94

&nbsp;

<a href="http://www.technoreply.com/how-to-install-sublime-text-2-on-ubuntu-12-04-unity/">Fuente</a>