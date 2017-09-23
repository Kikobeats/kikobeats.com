---
layout: post
title: Chatting from your terminal
date: '2014-08-01 13:02:09'
tags:
- hack
---

![](http://www.profanity.im/images/profanity_logo.png)

If you are a real freak, you must hangouts/facebook/whatever-that-support-XMPP-protocol chat from terminal:

![](http://i.imgur.com/LehabAL.png)

## How to

1) [Install profanity](http://www.profanity.im/install.html#manual) and run profanity from your terminal:

```
$ profanity
```

2) Setup the account that you want to chat, for example, if you can chat with hangouts (Google):

```
/account add google
/account set google jid myuser@mycompany.com
/account set google server talk.google.com
/account set google port 5432
```

more information [here](http://www.profanity.im/reference.html#account).

3) Login your account:

![](http://i.imgur.com/Vdk8t5f.png)

```
/connect google
[enter the password]
```

4. And finally know the typical command to interative with the chat:

```
/who <status> # (you can autocomplete with tab)
/msg <name> # (you can autocomplete with tab)
/win <number> # change the window (also use F1-F5)
```


## BONUS

![](http://i.imgur.com/GbdAr9E.png)

change the theme:

```
/theme list
/theme set <name>
```


*Feel like a little [Nick](https://www.linkedin.com/profile/view?id=209160420)!*