---
layout: post
title: Chatting from your terminal
date: '2014-08-01 13:02:09'
tags:
  - hack
---

![](/images/chatting-from-your-terminal/imagesprofanity_logo.png)

If you are a real freak, you must hangouts/facebook/whatever-that-support-XMPP-protocol chat from terminal:

![](/images/chatting-from-your-terminal/lehabal.png)

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

![](/images/chatting-from-your-terminal/vdk8t5f.png)

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

![](/images/chatting-from-your-terminal/gbdar9e.png)

change the theme:

```
/theme list
/theme set <name>
```


*Feel like a little [Nick](https://www.linkedin.com/profile/view?id=209160420)!*
