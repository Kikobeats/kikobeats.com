---
layout: post
title: DigitalOcean Droplets Benchmark
date: '2024-03-12'
image: /images/digitalocean-droplets-benchmark/header.jpeg
---

<style>
.layout-post ul { margin-top: 0.9em; }
</style>

DigitalOcean offers different kind of Droplets and I'm interested into find the sweet spot between money and performance.

## Methodology

1. Create a DigitalOcean droplet for the desired droplet size.
2. Install latest Ubuntu LTS.
3. Run `curl -sL http://yabs.sh | bash -s -- -f -i`

## Results

### General Purpose – Regular Intel

<details>
<summary>Full report</summary>
<pre>
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 1 minutes
Processor  : Intel(R) Xeon(R) Platinum 8168 CPU @ 2.70GHz
CPU cores  : 4 @ 2693.670 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ✔ Enabled
RAM        : 15.6 GiB
Swap       : 0.0 KiB
Disk       : 48.4 GiB
Distro     : Ubuntu 22.04.2 LTS
Kernel     : 5.15.0-67-generic
VM Type    : KVM
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : DigitalOcean, LLC
ASN        : AS14061 DigitalOcean, LLC
Host       : DigitalOcean, LLC
Location   : Santa Clara, California (CA)
Country    : United States

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 1085                          
Multi Core      | 2382                          
Full Test       | https://browser.geekbench.com/v6/cpu/5288951

YABS completed in 8 min 11 sec
</pre>
</details>

- slug: g-4vcpu-16gb
- billed: $126/mo or $0.1875/hr
- cpu: 4x Intel(R) Xeon(R) Platinum 8168 CPU @ 2.70GHz
- single core: 1085 / multi core: 2382 in 8 min 11 sec

### General Purpose — Premium Intel

<details>
<summary>Full report</summary>
<pre>
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 0 minutes
Processor  : INTEL(R) XEON(R) GOLD 6548N
CPU cores  : 4 @ 2800.000 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ✔ Enabled
RAM        : 15.6 GiB
Swap       : 0.0 KiB
Disk       : 58.0 GiB
Distro     : Ubuntu 24.04 LTS
Kernel     : 6.8.0-31-generic
VM Type    : KVM
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : DigitalOcean, LLC
ASN        : AS14061 DigitalOcean, LLC
Host       : DigitalOcean, LLC
Location   : Santa Clara, California (CA)
Country    : United States

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 1876                          
Multi Core      | 4152                          
Full Test       | https://browser.geekbench.com/v6/cpu/6684038

YABS completed in 6 min 9 sec
</pre>
</details>

- slug: g-4vcpu-16gb-intel
- billed: $151/mo or $0.2247/hr
- cpu: 4x Intel(R) Xeon(R) Platinum 8358 CPU @ 2.60GHz
- single core: 1876 / multi core: 4152 in 6 min 9 sec

### CPU-Optimized	– Regular Intel

<details>
<summary>Full report</summary>
<pre>
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 1 minutes
Processor  : Intel(R) Xeon(R) Platinum 8280 CPU @ 2.70GHz
CPU cores  : 4 @ 2693.670 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ✔ Enabled
RAM        : 7.8 GiB
Swap       : 0.0 KiB
Disk       : 48.4 GiB
Distro     : Ubuntu 22.04.2 LTS
Kernel     : 5.15.0-67-generic
VM Type    : KVM
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : DigitalOcean, LLC
ASN        : AS14061 DigitalOcean, LLC
Host       : DigitalOcean, LLC
Location   : San Francisco, California (CA)
Country    : United States

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 1266                          
Multi Core      | 2770                          
Full Test       | https://browser.geekbench.com/v6/cpu/5288976

YABS completed in 7 min 33 sec
</pre>
</details>

- slug: c-4vcpu-8gb
- billed: $84/mo or $0.125/hr
- cpu: 4x Intel(R) Xeon(R) Platinum 8280 CPU @ 2.70GHz
- single core: 1266 / multi core: 2770 in 7 min 33 sec

### CPU-Optimized	– Premium Intel (4vCPU)

<details>
<summary>Full report</summary>
<pre>
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 1 minutes
Processor  : INTEL(R) XEON(R) GOLD 6548N
CPU cores  : 4 @ 2800.000 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ✔ Enabled
RAM        : 7.8 GiB
Swap       : 0.0 KiB
Disk       : 48.4 GiB
Distro     : Ubuntu 24.04 LTS
Kernel     : 6.8.0-31-generic
VM Type    : KVM
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : DigitalOcean, LLC
ASN        : AS14061 DigitalOcean, LLC
Host       : DigitalOcean, LLC
Location   : Santa Clara, California (CA)
Country    : United States

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 1846                          
Multi Core      | 4166                          
Full Test       | https://browser.geekbench.com/v6/cpu/6683995

YABS completed in 6 min 10 sec
</pre>
</details>

- slug: c-4vcpu-8gb-intel
- billed: $109/mo or $0.1622/hr
- cpu: 4x INTEL(R) XEON(R) GOLD 6548N @ 2.80GHz
- single core: 1846 / multi core: 4166 in 6 min 10 sec

### CPU-Optimized	– Premium Intel (8vCPU)

<details>
<summary>Full report</summary>
<pre>
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 1 minutes
Processor  : INTEL(R) XEON(R) GOLD 6548N
CPU cores  : 8 @ 2800.000 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ✔ Enabled
RAM        : 15.6 GiB
Swap       : 0.0 KiB
Disk       : 96.8 GiB
Distro     : Ubuntu 24.04 LTS
Kernel     : 6.8.0-31-generic
VM Type    : KVM
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : DigitalOcean, LLC
ASN        : AS14061 DigitalOcean, LLC
Host       : DigitalOcean, LLC
Location   : Santa Clara, California (CA)
Country    : United States

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 1864                          
Multi Core      | 7204                          
Full Test       | https://browser.geekbench.com/v6/cpu/6683799

YABS completed in 5 min 37 sec
</pre>
</details>

- slug: c-8vcpu-16gb-intel
- billed: $218/mo or $0.324/hr
- cpu: 8x INTEL(R) XEON(R) GOLD 6548N @ 2800.000 MHz
- single core: 1864 / multi core: 7204 in 5 min 37 sec

### Basic	– Premium Intel (4vCPU)

<details>
<summary>Full report</summary>
<pre>
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 1 minutes
Processor  : DO-Premium-Intel
CPU cores  : 4 @ 1999.999 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ✔ Enabled
RAM        : 7.7 GiB
Swap       : 0.0 KiB
Disk       : 232.4 GiB
Distro     : Ubuntu 23.10
Kernel     : 6.5.0-9-generic
VM Type    : KVM
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : DigitalOcean, LLC
ASN        : AS14061 DigitalOcean, LLC
Host       : DigitalOcean, LLC
Location   : Santa Clara, California (CA)
Country    : United States

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 912                           
Multi Core      | 2783                          
Full Test       | https://browser.geekbench.com/v6/cpu/5435587

YABS completed in 8 min 34 sec
</pre>
</details>

- slug: s-4vcpu-8gb
- billed: $64/mo or $0.095/hr
- cpu: 4x 1999.999 MHz
- single core: 912 / multi core: 2783 in 8 min 34 sec

### Basic	– Premium AMD (4vCPU)

<details>
<summary>Full report</summary>
<pre>
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 1 minutes
Processor  : DO-Premium-AMD
CPU cores  : 4 @ 1996.246 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ✔ Enabled
RAM        : 15.6 GiB
Swap       : 0.0 KiB
Disk       : 193.8 GiB
Distro     : Ubuntu 22.04.2 LTS
Kernel     : 5.15.0-67-generic
VM Type    : KVM
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : DigitalOcean, LLC
ASN        : AS14061 DigitalOcean, LLC
Host       : DigitalOcean, LLC
Location   : Santa Clara, California (CA)
Country    : United States

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 880                           
Multi Core      | 2776                          
Full Test       | https://browser.geekbench.com/v6/cpu/5294642

YABS completed in 8 min 46 sec
</pre>
</details>

- slug: s-4vcpu-8gb-amd
- billed: $56/mo or $0.083/hr
- cpu: 4x 1996.247 MHz
- single core: 880 / multi core: 2776 in 8 min 46 sec

### Basic	– Premium AMD (8vCPU)

<details>
<summary>Full report</summary>
<pre>
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 2 minutes
Processor  : DO-Premium-AMD
CPU cores  : 8 @ 1996.247 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ✔ Enabled
RAM        : 15.6 GiB
Swap       : 0.0 KiB
Disk       : 310.1 GiB
Distro     : Ubuntu 22.04.2 LTS
Kernel     : 5.15.0-67-generic
VM Type    : KVM
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : DigitalOcean, LLC
ASN        : AS14061 DigitalOcean, LLC
Host       : DigitalOcean, LLC
Location   : Santa Clara, California (CA)
Country    : United States

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 894                           
Multi Core      | 4293                          
Full Test       | https://browser.geekbench.com/v6/cpu/5289263

YABS completed in 8 min 3 sec
</pre>
</details>

- slug: s-8vcpu-16gb-amd
- billed: $112/mo or $0.167/hr
- cpu: 8x 1996.247 MHz
- single core: 894 / multi core: 4293 in 8 min 3 sec

## performance-to-price ratio

*(higher is better)*

### single core

```
s-8vcpu-16gb-amd   | 894  | $112/mo | 7.9821428571
c-8vcpu-16gb-intel | 1864 | $218/mo | 8.5504587156
g-4vcpu-16gb       | 1085 | $126/mo | 8.6111111111
g-4vcpu-16gb-intel | 1876 | $151/mo | 12.4238410596
s-4vcpu-8gb        | 912  | $64/mo  | 14.25
c-4vcpu-8gb        | 1266 | $84/mo  | 15.0714285714
s-4vcpu-8gb-amd    | 880  | $56/mo  | 15.7142857143
c-4vcpu-8gb-intel  | 1846 | $109/mo | 16.9357798165
```

### multi core

```
g-4vcpu-16gb       | 2382 | $126/mo | 18.9047619048
g-4vcpu-16gb-intel | 4152 | $151/mo | 27.4966887417
c-4vcpu-8gb        | 2770 | $84/mo  | 32.9761904762
c-8vcpu-16gb-intel | 7204 | $218/mo | 33.0458715596
s-8vcpu-16gb-amd   | 4293 | $112/mo | 38.3303571429
c-4vcpu-8gb-intel  | 4166 | $109/mo | 38.2201834862
s-4vcpu-8gb        | 2783 | $64/mo  | 43.484375
s-4vcpu-8gb-amd    | 2776 | $56/mo  | 49.5714285714
```

### single core + multi core

```
g-4vcpu-16gb       | 1085 + 2382 | $126/mo | 27.5158730159
g-4vcpu-16gb-intel | 1876 + 4152 | $151/mo | 39.9205298013
c-8vcpu-16gb-intel | 1864 + 7204 | $218/mo | 41.5963302752
s-8vcpu-16gb-amd   | 894 + 4293  | $112/mo | 46.3125
c-4vcpu-8gb        | 1266 + 2770 | $84/mo  | 48.0476190476
c-4vcpu-8gb-intel  | 1846 + 4166 | $109/mo | 55.1559633028
s-4vcpu-8gb        | 912 + 2783  | $64/mo  | 57.734375
s-4vcpu-8gb-amd    | 880 + 2776  | $56/mo  | 65.2857142857
```
