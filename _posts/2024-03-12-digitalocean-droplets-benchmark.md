---
layout: post
title: DigitalOcean Droplets Benchmark
date: '2024-03-12'
image: images/digitalocean-droplets-benchmark/header.jpeg
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

### General Purpose – Regular Intel (4vCPU)

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

### General Purpose — Premium Intel (4vCPU)

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

### CPU-Optimized	– Regular Intel (4vCPU)

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

### Vultr – Shared CPU High Performance Intel (8vCPU)

<details>
<summary>Full report</summary>
<pre>
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 26 minutes
Processor  : Intel Xeon Processor (Cascadelake)
CPU cores  : 8 @ 2992.960 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ❌ Disabled
RAM        : 15.1 GiB
Swap       : 8.0 GiB
Disk       : 328.1 GiB
Distro     : Ubuntu 26.10
Kernel     : 7.3.0-10-generic
VM Type    : MICROSOFT
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : The Constant Company
ASN        : AS20473 The Constant Company, LLC
Host       : Vultr Holdings, LLC
Location   : Piscataway, New Jersey (NJ)
Country    : United States

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 1196                          
Multi Core      | 6155                          
Full Test       | https://browser.geekbench.com/v6/cpu/19458479

YABS completed in 6 min 29 sec
</pre>
</details>

- slug: vhp-8c-16gb-intel
- billed: $96/mo or $0.14/hr
- cpu: 8x Intel Xeon Processor (Cascadelake) @ 2992.960 MHz
- single core: 1196 / multi core: 6155 in 6 min 29 sec

### Vultr – Shared CPU High Performance AMD (8vCPU)

<details>
<summary>Full report</summary>
<pre>
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 1 minutes
Processor  : AMD EPYC-Rome Processor
CPU cores  : 8 @ 1996.248 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ❌ Disabled
RAM        : 15.1 GiB
Swap       : 8.0 GiB
Disk       : 328.1 GiB
Distro     : Ubuntu 26.10
Kernel     : 7.3.0-10-generic
VM Type    : MICROSOFT
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : Choopa
ASN        : AS20473 The Constant Company, LLC
Host       : Vultr Holdings, LLC
Location   : Piscataway, New Jersey (NJ)
Country    : United States

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 818                           
Multi Core      | 3368                          
Full Test       | https://browser.geekbench.com/v6/cpu/19458522

YABS completed in 8 min 51 sec
</pre>
</details>

- slug: vhp-8c-16gb-amd
- billed: $96/mo or $0.14/hr
- cpu: 8x AMD EPYC-Rome Processor @ 1996.248 MHz
- single core: 818 / multi core: 3368 in 8 min 51 sec

### Vultr – Shared CPU High Frequency Intel (4vCPU)

<details>
<summary>Full report</summary>
<pre>
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 1 minutes
Processor  : Intel Core Processor (Skylake, IBRS, no TSX)
CPU cores  : 4 @ 3791.944 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ❌ Disabled
RAM        : 15.1 GiB
Swap       : 8.0 GiB
Disk       : 360.0 GiB
Distro     : Ubuntu 26.10
Kernel     : 7.3.0-10-generic
VM Type    : MICROSOFT
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : The Constant Company
ASN        : AS20473 The Constant Company, LLC
Host       : Vultr Holdings, LLC
Location   : Piscataway, New Jersey (NJ)
Country    : United States

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 1471                          
Multi Core      | 4082                          
Full Test       | https://browser.geekbench.com/v6/cpu/19458539

YABS completed in 6 min 18 sec
</pre>
</details>

- slug: vhf-4c-16gb
- billed: $96/mo or $0.14/hr
- cpu: 4x Intel Core Processor (Skylake, IBRS, no TSX) @ 3791.944 MHz
- single core: 1471 / multi core: 4082 in 6 min 18 sec

## performance-to-price ratio

*(higher is better)*

### single core

```
s-8vcpu-16gb-amd   | 894  | $112/mo | 7.9821428571
vhp-8c-16gb-amd    | 818  | $96/mo  | 8.5208333333
c-8vcpu-16gb-intel | 1864 | $218/mo | 8.5504587156
g-4vcpu-16gb       | 1085 | $126/mo | 8.6111111111
g-4vcpu-16gb-intel | 1876 | $151/mo | 12.4238410596
vhp-8c-16gb-intel  | 1196 | $96/mo  | 12.4583333333
s-4vcpu-8gb        | 912  | $64/mo  | 14.25
c-4vcpu-8gb        | 1266 | $84/mo  | 15.0714285714
vhf-4c-16gb        | 1471 | $96/mo  | 15.3229166667
s-4vcpu-8gb-amd    | 880  | $56/mo  | 15.7142857143
c-4vcpu-8gb-intel  | 1846 | $109/mo | 16.9357798165
```

### multi core

```
g-4vcpu-16gb       | 2382 | $126/mo | 18.9047619048
g-4vcpu-16gb-intel | 4152 | $151/mo | 27.4966887417
c-4vcpu-8gb        | 2770 | $84/mo  | 32.9761904762
c-8vcpu-16gb-intel | 7204 | $218/mo | 33.0458715596
vhp-8c-16gb-amd    | 3368 | $96/mo  | 35.0833333333
c-4vcpu-8gb-intel  | 4166 | $109/mo | 38.2201834862
s-8vcpu-16gb-amd   | 4293 | $112/mo | 38.3303571429
vhf-4c-16gb        | 4082 | $96/mo  | 42.5208333333
s-4vcpu-8gb        | 2783 | $64/mo  | 43.484375
s-4vcpu-8gb-amd    | 2776 | $56/mo  | 49.5714285714
vhp-8c-16gb-intel  | 6155 | $96/mo  | 64.1145833333
```

### single core + multi core

```
g-4vcpu-16gb       | 1085 + 2382 | $126/mo | 27.5158730159
g-4vcpu-16gb-intel | 1876 + 4152 | $151/mo | 39.9205298013
c-8vcpu-16gb-intel | 1864 + 7204 | $218/mo | 41.5963302752
vhp-8c-16gb-amd    | 818 + 3368  | $96/mo  | 43.6041666667
s-8vcpu-16gb-amd   | 894 + 4293  | $112/mo | 46.3125
c-4vcpu-8gb        | 1266 + 2770 | $84/mo  | 48.0476190476
c-4vcpu-8gb-intel  | 1846 + 4166 | $109/mo | 55.1559633028
s-4vcpu-8gb        | 912 + 2783  | $64/mo  | 57.734375
vhf-4c-16gb        | 1471 + 4082 | $96/mo  | 57.84375
s-4vcpu-8gb-amd    | 880 + 2776  | $56/mo  | 65.2857142857
vhp-8c-16gb-intel  | 1196 + 6155 | $96/mo  | 76.5729166667
```

## Conclusion

If the goal is to maximize **performance per dollar**, the winner is **Vultr vhp-8c-16gb-intel**.

- Best value in multi-core performance-per-price, 29% ahead of the next one (s-4vcpu-8gb-amd).
- Best value in combined single-core + multi-core performance-per-price.
- Second fastest in absolute multi-core score, at 44% of the price of the fastest one.

Pick the Intel flavor over **vhp-8c-16gb-amd**: same price, but Intel is 46% faster in single-core and 83% faster in multi-core.

For the same $96/mo, **vhf-4c-16gb** trades cores for clock speed: 23% faster in single-core than vhp-8c-16gb-intel, but 34% slower in multi-core.

Within DigitalOcean, **s-4vcpu-8gb-amd** is still the best value, being the cheapest option tested.

If the goal is **single-core performance per dollar**, **c-4vcpu-8gb-intel** wins.

If the goal is **highest raw CPU performance** (not value), **c-8vcpu-16gb-intel** is the fastest in absolute multi-core score.
