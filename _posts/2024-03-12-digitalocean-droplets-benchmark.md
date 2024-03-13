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

#### General Purpose – Regular Intel

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

#### General Purpose — Premium Intel

<details>
<summary>Full report</summary>
<pre>
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 1 minutes
Processor  : Intel(R) Xeon(R) Platinum 8358 CPU @ 2.60GHz
CPU cores  : 4 @ 2599.998 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ✔ Enabled
RAM        : 15.6 GiB
Swap       : 0.0 KiB
Disk       : 58.1 GiB
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
Single Core     | 1493                          
Multi Core      | 3129                          
Full Test       | https://browser.geekbench.com/v6/cpu/5288945

YABS completed in 6 min 59 sec
</pre>
</details>

- slug: g-4vcpu-16gb-intel
- billed: $151/mo or $0.2247/hr
- cpu: 4x Intel(R) Xeon(R) Platinum 8358 CPU @ 2.60GHz
- single core: 1493 / multi core: 3129 in 6 min 59 sec

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
Processor  : Intel(R) Xeon(R) Platinum 8358 CPU @ 2.60GHz
CPU cores  : 4 @ 2599.998 MHz
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
Location   : Santa Clara, California (CA)
Country    : United States

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 1496                          
Multi Core      | 3138                          
Full Test       | https://browser.geekbench.com/v6/cpu/5289000

YABS completed in 6 min 59 sec
</pre>
</details>

- slug: c-4vcpu-8gb-intel
- billed: $109/mo or $0.1622/hr
- cpu: 4x Intel(R) Xeon(R) Platinum 8358 CPU @ 2.60GHz
- single core: 1496 / multi core: 3138 in 6 min 59 sec

### CPU-Optimized	– Premium Intel (8vCPU)

<details>
<summary>Full report</summary>
<pre>
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 3 minutes
Processor  : Intel(R) Xeon(R) Platinum 8358 CPU @ 2.60GHz
CPU cores  : 8 @ 2593.904 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ✔ Enabled
RAM        : 15.6 GiB
Swap       : 0.0 KiB
Disk       : 96.8 GiB
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
Single Core     | 1507                          
Multi Core      | 5460                          
Full Test       | https://browser.geekbench.com/v6/cpu/5293753

YABS completed in 6 min 27 sec
</pre>
</details>

- slug: c-8vcpu-16gb-intel
- billed: $218/mo or $0.324/hr
- cpu: 8x Intel(R) Xeon(R) Platinum 8358 CPU @ 2.60GHz
- single core: 1507 / multi core: 5460 in 6 min 27 sec


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
- billed: $84/mo or $0.125/hr
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

## Price-performance ratio

### single core

```
c-8vcpu-16gb-intel | $218/mo | 1507 | 6.9128440367
s-8vcpu-16gb-amd   | $112/mo | 894  | 7.9821428571
g-4vcpu-16gb       | $126/mo | 1085 | 8.6111111111
g-4vcpu-16gb-intel | $151/mo | 1493 | 9.8874172185
s-4vcpu-8gb-amd    | $84/mo  | 880  | 10.4761904762
c-4vcpu-8gb-intel  | $109/mo | 1496 | 13.7247706422
c-4vcpu-8gb        | $84/mo  | 1266 | 15.0714285714
```

### multi core

```
g-4vcpu-16gb       | $126/mo | 2382 | 18.9047619048
g-4vcpu-16gb-intel | $151/mo | 3129 | 20.7218543046
c-8vcpu-16gb-intel | $218/mo | 5460 | 25.0458715596
c-4vcpu-8gb-intel  | $109/mo | 3138 | 28.7889908257
c-4vcpu-8gb        | $84/mo  | 2770 | 32.9761904762
s-4vcpu-8gb-amd    | $84/mo  | 2776 | 33.0476190476
s-8vcpu-16gb-amd   | $112/mo | 4293 | 38.3303571429
```

### single core + multi core

```
c-8vcpu-16gb-intel | $218/mo | 1507 | 25.8176059415
s-8vcpu-16gb-amd   | $112/mo | 894  | 28.7039971617
g-4vcpu-16gb       | $126/mo | 1085 | 33.6569826707
g-4vcpu-16gb-intel | $151/mo | 1493 | 38.6764080442
s-4vcpu-8gb-amd    | $84/mo  | 2776 | 43.5238095238
c-4vcpu-8gb-intel  | $109/mo | 1496 | 46.7009611184
c-4vcpu-8gb        | $84/mo  | 1266 | 53.4017857143
```
