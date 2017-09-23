---
layout: post
title: Updating Hackintosh from 10.8 to Mavericks (10.9)
date: '2013-11-05 03:42:02'
tags:
- hack
---

<a href="http://kikobeats.files.wordpress.com/2013/11/mavericks-hackintosh.png"><img class="size-medium wp-image-1188 aligncenter" alt="mavericks-hackintosh" src="http://kikobeats.files.wordpress.com/2013/11/mavericks-hackintosh.png?w=300" width="300" height="131" /></a>
<h2>Hardware</h2>
<ul>
	<li>Z77-DS3H</li>
	<li>i5-3570K @ 4.2GHz</li>
	<li>2x8 DDR3 Corsair Vengeance</li>
	<li>ATI 5850</li>
</ul>
<h2>Pre-Requirements</h2>
<ul>
	<li>Update the system at the last version of 10.8</li>
	<li>Install all pending software updates</li>
	<li>Clean the system with CCleaner or CleanMyMac (for ex.)</li>
</ul>
<h2>Mavericks Install</h2>
<ul>
	<li>Download Mavericks from Apple Store</li>
	<li>Create boot USB with <a href="http://myhack.sojugarden.com/">myHack</a> utility (Alternatively you can use <a href="http://www.tonymacx86.com/374-unibeast-install-os-x-mavericks-any-supported-intel-based-pc.html">Unibeast</a>, but dont work nice in my case)</li>
</ul>
<h2>Post-Installation</h2>
Additionally for my hardware need custom drivers from <a href="http://www.tonymacx86.com/downloads.php?do=file&amp;id=201">Multibeast</a>. This is my setup:
<p style="text-align:left;"><a href="http://kikobeats.files.wordpress.com/2013/11/captura-de-pantalla-2013-11-04-a-las-18-30-06.png"><img class="size-medium wp-image-1190 aligncenter" alt="Captura de pantalla 2013-11-04 a la(s) 18.30.06" src="http://kikobeats.files.wordpress.com/2013/11/captura-de-pantalla-2013-11-04-a-las-18-30-06.png?w=300" width="300" height="231" /></a>and <a href="http://www.osx86.net/files/download/2971-usb-3-0-lacie-kext-patched-by-modbin/">USB3 Support</a> kexts (install with Kext Wizard).</p>

<h2 style="text-align:left;">Adjust CPU</h2>
<ol>
	<li>Generate CPU states with <a href="https://raw.github.com/Piker-Alpha/RevoBoot/clang/i386/libsaio/acpi/Tools/ssdtPRGen.sh">ssdtPrGen.sh</a>. $1 argument is  your max OC turbo frequency (4200 in my case). Generate ssdt_pr dsl and aml files.</li>
	<li>Open Kext Wizard &gt; DSDT &gt; Save DSDT File</li>
	<li>Copy both *.aml files ad move to /Extra directory</li>
	<li>If you can problems with overclock, disable EIST from BIOS.</li>
</ol>