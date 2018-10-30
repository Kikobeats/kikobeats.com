---
layout: post
title: How I resolved Amazon π Contest
image: http://i.imgur.com/X2Ka2kZ.jpg
date: '2015-04-19 16:45:32'
tags:
- hack
---

Time in the past, a wild tweet appeared in my timeline:

<blockquote class="twitter-tweet" lang="es"><p>Amazon is hiring in Spain! Give it a try! <a href="http://t.co/jH3YisaTeK">pic.twitter.com/jH3YisaTeK</a></p>&mdash; Jaime Vallori (@jvallori) <a href="https://twitter.com/jvallori/status/563046478521057280">febrero 4, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<br>

Actually I wasn't interested in be part of the Amazon in that moment, but I was interested if I might be able to resolve it and what would happen. Let's go.

At first I knew nothing about palindromes in the pi decimals. First notice about it. But it does not matter, I put all the effort for resolve the problem with the more simple way. Alsot doesn't put nothing restriction about language or technology, so I decided getting comfortable and think fast.

First, I generated a list of 5 numbers (0000 to 9999). I only need five because I can create a palindrome reversing the numbers, for example:

```js
const reverseNumber = (number) => number.split('').reverse().join('')
const number = '12345'
const reversedNumber = reverse('12345') // => 54321
const palindrome = number + reversedNumber // => 1234554321
```

Yes, I decided to use JavaScript.

The second part of the problem is know what palindrome of the 9999 palindromes is the correct. So the unique information that we have is that is part of the decimals of pi... **and it is an accessible url!**. This is an awesome information. I created a little piece of code to access **all** possible urls and output the url that is resolved (maybe exist more palindrome urls registered, but what the hell).

I created a stream for read the file fast line by line and for each line created a HTTP request, waiting for the address that resolves the exercise. Also I use a library to makes the requests.

This is the result of the code:

<script src="https://gist.github.com/Kikobeats/79d6c0baad034fc43b42.js"></script>

It reports me the [0136776310.com](http://0136776310.com) and efectively, I resolved the first part of the contest:

![](http://i.imgur.com/VRxy2EE.png)

The next exercise was waiting me. I knew that a brute force is just a simple people filter for the first step, so I really wanted to resolved the next exercise.

Actually was simple. The file of the website had a large list of numbers. Again, stream for read by line will be useful.

Now the output of the exercise that will resolve the problem is, first, a primer number, and second, the value of the number is equal to number of the line in the file.

<script src="https://gist.github.com/Kikobeats/2a0788020b85fbd5b882.js"></script>

And done!

![](http://i.imgur.com/HfezX6c.png)

The truth is that I really liked it. I did not continue with the selection process because it was a bit heavy, but congratulations to Amazon for the hiring process.
