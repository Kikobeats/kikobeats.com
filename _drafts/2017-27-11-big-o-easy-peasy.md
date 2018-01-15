---
layout: post
title: Big O, easy peasy way
date: '2017-11-27 11:00:00'
image: https://i.imgur.com/uIqvOAb.png
tags:
- computer-science
---

## Visualization

![](https://i.imgur.com/sRshqTG.png9)

## Nomenclature

| Name         | Notation    | Example         | How you feel at a party |
| ------------ | ----------- | ----------------| -----------------------------------------    |
| Constant     |  O(1)       | Direct access   | AWESOME!! |
| Logarithmic  |  O(log N)   | Binary Search   | GREAT! |
| Linear       |  O(N)       | for loop        | OKAY. |
| Linearithmic |  O(N log N) |                 | UGH... |
| Polynomial   |  O(N ^ 2)   | double for loop | SHITTY |
| Exponential  |  O(2 ^ N)   | All combinations| HORRIBLE |
| Factorial    |  O(N!)      |                 | WTF |

## Growth Rates

| n f(n) | log n   | n       | n log n  | n2         | 2n        | n!          |
|--------|---------|---------|----------|------------|-----------|-------------|
| 10     | 0.003ns | 0.01ns  | 0.033ns  | 0.1ns      | 1ns       | 3.65ms      |
| 20     | 0.004ns | 0.02ns  | 0.086ns  | 0.4ns      | 1ms       | 77years     |
| 30     | 0.005ns | 0.03ns  | 0.147ns  | 0.9ns      | 1sec      | 8.4x1015yrs |
| 40     | 0.005ns | 0.04ns  | 0.213ns  | 1.6ns      | 18.3min   | ∞           |
| 50     | 0.006ns | 0.05ns  | 0.282ns  | 2.5ns      | 13days    | ∞           |
| 100    | 0.07ns  | 0.1ns   | 0.644ns  | 0.10ns     | 4x1013yrs | ∞           |
| 1K     | 0.010ns | 1.00ns  | 9.966ns  | 1ms        | ∞         | ∞           |
| 10K    | 0.013ns | 10ns    | 130ns    | 100ms      | ∞         | ∞           |
| 100K   | 0.017ns | 0.10ms  | 1.67ms   | 10sec      | ∞         | ∞           |
| 1M     | 0.020ns | 1ms     | 19.93ms  | 16.7min    | ∞         | ∞           |
| 10M    | 0.023ns | 0.01sec | 0.23ms   | 1.16days   | ∞         | ∞           |
| 100M   | 0.027ns | 0.10sec | 2.66sec  | 115.7days  | ∞         | ∞           |
| 1000M  | 0.030ns | 1sec    | 29.90sec | 31.7 years | ∞         | ∞           |

## Bibliography

* [Complexity and Big-O notation](https://medium.freecodecamp.org/time-is-complex-but-priceless-f0abd015063c)
* [Itsy Bitsy Data Structures](https://github.com/thejameskyle/itsy-bitsy-data-structures).
* [Big O Cheat Sheet](http://bigocheatsheet.com).

- https://medium.com/@gmedina229/big-o-in-javascript-36ff67766051
- https://github.com/thejameskyle/itsy-bitsy-data-structures/blob/master/itsy-bitsy-data-structures.js
- https://cooervo.github.io/Algorithms-DataStructures-BigONotation/
- https://www.packtpub.com/sites/default/files/downloads/4874OS_Appendix_Big_O_Cheat_Sheet.pdf
- http://bigocheatsheet.com/
- http://www.souravsengupta.com/cds2016/lectures/Complexity_Cheatsheet.pdf
- https://gist.github.com/TSiege/cbb0507082bb18ff7e4b
- https://medium.freecodecamp.org/time-is-complex-but-priceless-f0abd015063c
