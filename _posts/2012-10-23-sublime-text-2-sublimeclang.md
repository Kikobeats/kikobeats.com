---
layout: post
title: Sublime Text 2 con SublimeClang
date: '2012-10-23 15:48:05'
tags:
- computer-science
---

Si necesitas programar en C++ seguramente has pensado en utilizar un Entorno de Programación (IDE). El único inconveniente de éstos es que suelen ser muy pesados y poco prácticos de utilizar. Podemos, aprovechando las funcionalidades nativas de Sublime Text 2 y agregando otras a través de paquetes obtener un editor de código mucho más rápido que cualquier IDE.

Esta guía va orientada para compilar código C++ en Linux. Así mismo se puede utilizar para configurar otros lenguajes de programación  derivados de C. (C,Objetive-C++,Objetive-C)

Lo primero que tenemos que tener instalado es el <strong>Package control</strong>. Es una utilidad que sirve para añadir paquetes a Sublime Text 2. Supongo que está instalado, pero para los que no, dejo el <a href="http://wbond.net/sublime_packages/package_control">link</a> (No hago la instalación porque es algo muy trivial).

Vamos a hacer dos cosas: instalar un <strong>autcompletador de código</strong> y configurar las <strong>builds</strong>para compilar C++.

Para instalar el autocompletador de código tendremos que buscar en Package Control el paquete llamado <strong>SublimeClang.</strong>

Para que funcione correctamente en Linux tendremos que hacer algunas cosas adicionales (como no…) relacionadas con el linkeo de las librerías que internamente utiliza el paquete.

Éstos son los pasos que tenemos que seguir:

[sourcecode language="bash"]

curl -kL &lt;a href="http://xrl.us/pythonbrewinstall"&gt;http://xrl.us/pythonbrewinstall&lt;/a&gt; | bash

source "$HOME/.pythonbrew/etc/bashrc"

pythonbrew install --configure="--enable-unicode=ucs4" 2.6

ln -s $HOME/.pythonbrew/pythons/Python-2.6/lib/python2.6/ /lib/python2.6

[/sourcecode]

Después de ésto tendremos que hacer un último paso para compilar la librería y que todo funciona correctamente, para ello:<code></code>

[sourcecode language="bash"]

cd ~/.config/sublime-text-2/Packages/SublimeClang/src/
mkdir build
cd build
cmake ..
make

[/sourcecode]

Si lo hemos hecho correctamente ya tendremos el autocompletador instalado.
<p style="text-align:center;"><a href="http://i.imgur.com/ll2iF.png"><img class="aligncenter" alt="" src="http://i.imgur.com/ll2iF.png" width="442" height="280" /></a></p>

<pre></pre>
El siguiente paso es construir una build. Por defecto Sublime Text 2 detecta nuestro lenguaje de programación y nos asocia una build por defecto. Una build es una serie de parámetros preestablecidos que compilarán el programa cuando queramos hacerlo. Lo interesante es que podamos hacer nuestra propia build, pues g++ (el compilador de C++ para Linux) acepta varios parámetros que nos pueden interesar, o tal vez nos pueda interesar hacer un determinado comando después de haber realizado la compilación. <code></code>
<p style="padding-left:30px;">Tools &gt; Build systems &gt; new build system…</p>
  En la nueva venta que nos aparece pegamos el siguiente código:

[sourcecode]
{
"cmd": ["g++ -g -Wall ${file} -o ${./build/file_base_name} &amp;&amp; ./${file_base_name}"],
"working_dir": "${file_path}",
"selector": "source.c++",
"shell": true,

"windows":
{
"cmd": ["cl", "/Fo${file_path}", "/O2", "$file"],
"selector": "source.c++",
"shell": true
}
}

[/sourcecode]

Con este código estamos haciendo lo siguiente: Ejecutamos el compilador g++ con las órdenes <strong>-g -Wall</strong>, las cuales son para activar el debugger y nos avisa cuando una variable es declarada y no empleada. En el segundo grupo de comandos creamos un objeto con el mismo nombre que el archivo original y lo guardamos dentro de una carpeta que se llamará build.. Por último con &amp;&amp; encadenamos una orden que queramos que se ejecute cuando la compilación haya sido un éxito. En este caso, ejecutará el programa en cuestión.

También he añadido una build para cuando compilemos en Windows (ya que no es igual) aunque esta no la he probado.