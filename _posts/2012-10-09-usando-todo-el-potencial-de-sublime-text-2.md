---
layout: post
title: Usando todo el potencial de Sublime Text 2
date: '2012-10-09 16:51:36'
tags:
- computer-science
---

Una de las cosas que caracteriza a Sublime Text 2 es que, en primer lugar, tiene muchísimos atajos de teclado, y segundo de que es muy personalizable, ya sea adaptando la interfaz gráfica o extendiendo sus funcionalidades mediante paquetes.

A continuación os voy a dejar la configuración que utilizo yo por si queréis utilizarla como referencia.
<h3>Atajos de teclado generales</h3>
<ul>
	<li>ctrl+shit+Flecha Arriba: Subir texto inline una linea</li>
	<li>ctrl+shit+Flecha Arriba: Bajar texto inline una linea</li>
	<li>ctrl+b: compilar</li>
	<li>super+ctrl+b: Mostrar/Esconder panel izquierdo</li>
	<li>super+ctrl+e: Entrar/Salir de fullscreen</li>
	<li>super+ctrl+g: Entrar/Salir modo sin distracciones</li>
	<li>super+ctrl+c: Mostrar/Esconder consola</li>
	<li>alt+shift+1..8: Cambiar layout</li>
	<li>shift+ctrl+1..8: Mover pestaña de layout</li>
	<li>shitf+ctrl+p: Buscador</li>
	<li>ctrl+shift+T: Abrir pestaña anterior</li>
	<li>shift+p: buscar y abrir un fichero en el proyecto</li>
	<li>ctrl+g: salta a la línea establecida</li>
	<li>ctrl+R: buscar en el documento</li>
</ul>
<h3>Atajos de teclado personalizados (Key Binding User)</h3>
<code> [
{ "keys": ["super+ctrl+b"], "command": "toggle_side_bar"},
{ "keys": ["super+ctrl+e"], "command": "toggle_full_screen" },
{ "keys": ["super+ctrl+c"], "command": "show_panel", "args": {"panel": "console", "toggle": true} },
{ "keys": ["super+ctrl+g"], "command": "toggle_distraction_free"},
{ "keys": ["alt+6"], "command": "open_browser" }
]</code>
<h3>Preferencias personalizadas (Settings User)</h3>
<code>{
"color_scheme": "Packages/Color Scheme - Default/Monokai LightBlue.tmTheme",
"create_window_at_startup": false,
"font_size": 11,
"highlight_active_indent_guide": true,
"highlight_line": true,
"hot_exit": false,
"ignored_packages":
[
"Vintage"
],
"theme": "Soda Dark.sublime-theme"
}
</code>

El tema que utilizo se llama <strong>Monokai LightBlue</strong>  que yo mismo creé a partir del tema Monokai y que se caracteriza por un tono azulado. Los paquetes que utilizo son mayormente orientados al desarrollo web para aumentar la productividad al trabajar con código HTML. También tengo integración con el FTP (así puedo editar los archivos en línea) y un corrector de código para C y sus derivados.

Paquetes y temas: <a href="https://www.dropbox.com/s/xsojw51och1own3/Packages.zip">Descargar</a>