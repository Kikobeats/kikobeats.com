---
layout: post
title: Construyendo un Hackintosh basado en AMD (Parte II)
date: '2013-04-04 18:33:11'
tags:
- hack
---

Tras la <a href="http://kikobeats.com/construyendo-un-hackintosh-basado-en-amd-parte-i/">primera entrega</a> en donde presentaba un poco mis intenciones nos metemos de lleno en el proceso de obtención de un Hackintosh basado en un procesador <strong>AMD</strong>.

Puedo decir, no sin cierto reparo en todo lo que me ha costado que lo conseguí. Ahora mismo me encuentro escribiendo estas palabras desde mi <strong>Hackintosh AMD</strong> <em>cuasi-perfectamente</em> operativo.

Aunque en principio quería centrar la guía para cualquier tipo de instalación basada en AMD creo que lo mejor será hacerlo desde lo que yo he hecho y dando algunas pistas para aquellos que tengáis hardware parecido.
<p style="text-align:center;"><a href="http://kikobeats.com/content/images/old/2013/04/kext.jpg"><img class="aligncenter size-full wp-image-666" alt="kext" src="http://kikobeats.com/content/images/old/2013/04/kext.jpg" width="200" height="200" /></a></p>
Bien, lo primero que tenemos que hacer es hacernos con algún equipo que ya tenga macOS. Sí, la vida es así de cruel. Necesitamos de algún equipo de apoyo para poder tratar con archivos con extensión .<strong>dmg</strong> .<strong>kext</strong> y demás formatos relacionados con el mundo mac. Creo que es imposible, o por contra avanzaréis muy lentos si no utilizáis un equipo mac para hacer las operaciones triviales que harán falta durante en el proceso de instalación y tras ella.

Asumo que tenéis un equipo mac sobre el que trabajar. Por ir ahorrando pasos, lo primero que necesitaremos será una imagen de disco de <strong>Mountain Lion</strong>.

También necesitaremos una utilidad llamada <a href="http://myhack.sojugarden.com/">myHack</a> y un pendrive de al menos 8Gb. Ay, la de pasos que me habría ahorrado yo si me hubieran dado esta información de primeras. Oro en paño chavales.

Teniendo la imagen y myHack lo que vamos a hacer es hacer la imagen bootable desde un pendrive. Para ello arrancamos myHack y vamos siguiendo los pasos

<a href="http://kikobeats.com/construyendo-un-hackintosh-basado-en-amd-parte-ii/captura-de-pantalla-2013-04-04-a-las-23-30-55/" rel="attachment wp-att-656"><img class="aligncenter size-medium wp-image-656" alt="Captura de pantalla 2013-04-04 a la(s) 23.30.55" src="http://kikobeats.com/content/images/old/2013/04/Captura-de-pantalla-2013-04-04-a-las-23.30.55-300x261.png" /></a>

Seguimos la instalación, seleccionando la imagen cuando sea oportuno y demás. Durante la instalación el programa nos sugerirá remover algunos <strong>kext</strong> que pueden causar problemas. Un <strong>kext</strong> es un archivo del sistema que extiende el núcleo proporcionando información adicional del hardware. En la práctica esto quiere decir que cierto hardware sólo será reconocido si contamos con los kexts adecuados (Por ejemplo, kext de sonido, de gráficos, etc). Comparando con un sistema Windows, un kext equivale a un driver.

Lo que nos está diciendo myHack es que Apple proporciona kext que serán cargados durante el arranque del sistema. Esos Kext se corresponden con hardware de Apple, el cual no tenemos o no va a ser igual, por lo que posiblemente al cargarlo podamos obtener un Kernel Panic. Vamos, que sí, que le digamos a myHack que los quite (Y sí, te lo podría haber dicho de primeras pero prefiero darte la chapa).

Al final del proceso lo que hemos obtenido es una versión bootable de Mountain Lion. Bien, ahora toca explicar algunas cosa.

Aparte de lo prevenir algunos kext que nos darán terminar nuestra instalación en un bonito <strong>KP</strong>, lo que ha hecho también myHack es instalar un sistema de booteo llamado <strong>Chameleon.</strong> Y pensarás ¿Y a mí qué? Pues la verdad es que es algo importante. ¿No te has fijado que un ordenador oficial de mac no tiene <a href="http://es.wikipedia.org/wiki/BIOS">BIOS</a>? Eso es porque el proceso de arranque lo hace a través de <a href="http://es.wikipedia.org/wiki/Extensible_Firmware_Interface">EFI</a>. Puede que nuestra placa tenga BIOS o EFI, pero indistintamente lo que va a hacer Chameleon es simular el EFI de las placas bases de Apple. Si no hace esto, el sistema no arrancará porque fallará el check que hace Apple al principio para comprobar toda la integridad del hardware.

<a href="http://kikobeats.com/construyendo-un-hackintosh-basado-en-amd-parte-ii/250px-efi-simple_es/" rel="attachment wp-att-664"><img class="aligncenter size-full wp-image-664" alt="250px-Efi-simple_es" src="http://kikobeats.com/content/images/old/2013/04/250px-Efi-simple_es.png" /></a>

Lo tenemos casi todo. Sólo nos hace falta una adaptación del <a href="http://es.wikipedia.org/wiki/Darwin_(sistema_operativo)">kernel darwin</a> (que es el nombre del kernel de macOS) para que pueda correr bajo un procesador AMD.

Cada modificación del kernel Darwin para procesadores AMD es diferente dependiendo de la generación de nuestro procesador. Me explico. La versión que estamos intentando instalar de macOS utiliza en su kernel instrucciones para el procesador del tipo <a href="http://es.wikipedia.org/wiki/SSSE3">SSSE3</a> (que no SSE3, ojo). Éstas instrucciones son implementadas en los procesadores basados en la arquitectura <a href="http://es.wikipedia.org/wiki/Bulldozer_(microarquitectura)"><strong>Bulldozer</strong></a> pero no en la generación de procesadores menos modernos, como <strong><a href="http://es.wikipedia.org/wiki/Bulldozer_(microarquitectura)">Phenom</a> </strong>(por ejemplo). Por ello, es necesario adaptar el núcleo para que cada arquitectura de procesadores pueda interpretarlo correctamente.

Ésta es una particularidad del núcleo que yo en concreto conozco, y que me imagino que habrá algunas más, pues no he tratado con el núcleo (Aunque también imagino que tiene que ser <em>bonico</em>)

Por lo tanto, necesitamos una versión de núcleo acorde a nuestro hardware. Te voy a poner las cosas fáciles y te diré que sólo tendrás que mirar <a href="http://www.insanelymac.com/forum/topic/285580-database-of-current-working-amd-kernels/">éste post en Insanelymac.com</a> para obtener tu versión del núcleo buscada.

<strong>OFFTOPIC: </strong>Desde que descubrí esto no dejo de asombrarme. Hay auténtica gente en internet  que son auténticas máquinas, adaptando núcleos para arquitecturas de procesadores, traduciendo instrucciones de procesador en un juego de instrucciones compatible... en definitiva haciendo que todo esto sea posible, y, muy posiblemente haciéndolo por amor al arte. Verdaderos héroes. (<a href="http://www.insanelymac.com/forum/topic/281450-mountain-lion-kernel-testing-on-amd/">Si quiere saber más mira esto</a>).

Cuando hayas localizado tu versión del núcleo (recuerda que tiene que ser para 10.8) descárgatela y la debes colocar en la raíz de un pendrive usb. Antes de eso renómbrala a un nombre identificable, por ejemplo, <strong>amd_kernel</strong>. No te aconsejo machacar la versión de kernel original <strong>match_kernel</strong> que también hay en la raíz del pendrive.

Hasta aquí la segunda entrega. En la tercera abordaremos el proceso de instalación y post-instalación. ¡Ya queda menos! :)