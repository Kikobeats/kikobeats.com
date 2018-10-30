---
layout: post
title: Storing Passwords 101
image: https://i.imgur.com/Jlt6qh2.png
date: '2016-09-02 09:18:14'
tags:
- backend
---

# Don't use hash algorithm

I mean, not only.

*MD5*, *SHA1*, *SHA256*, *SHA512*, *SHA-3*,...

These are all general purpose hash functions, designed to calculate a digest of huge amounts of data in as short a time as possible.

This means that they are fantastic for ensuring the integrity of data and utterly rubbish for storing passwords.

# Salt for prevent brute force attacks

A **salt** is a random value that is generally not a secret, which is used to make some precomputed attacks harder.

```
hash(salt+password)=hashed password
```

Salts are closely related to the concept of [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

The primary function of salts is to defend against dictionary attacks versus a list of password hashes and against pre-computed rainbow table attacks.

**NOTE:** Don't confuse *salt* and *seed*. A *seed* is a random value which generally has to be kept secret or the encryption is broken.

# Use strong salt rounds

[Bcrypt](https://en.wikipedia.org/wiki/Bcrypt) is an adaptative password hashing function: over time, the iteration count can be increased to make it slower, so it remains resistant to brute-force search attacks even with increasing computation power.


> How much slower is bcrypt than, say, MD5? Depends on the work factor. Using a work factor of 12, bcrypt hashes the password just in about 0.3 seconds on my laptop. MD5, on the other hand, takes less than a microsecond.

> So weakly talking about 5 or so orders of magnitude. Instead of cracking a password every 40 seconds, We will be cracking them every 12 years or so. Your passwords might not need that kind of security and you might need a faster comparison algorithm, but bcrypt allows you to choose your balance of speed and security. Use it.

That's little benchmark to know how salt rounds affect:

```
rounds=8 : ~40 hashes/sec
rounds=9 : ~20 hashes/sec
rounds=10: ~10 hashes/sec
rounds=11: ~5  hashes/sec
rounds=12: 2-3 hashes/sec
rounds=13: ~1 sec/hash
rounds=14: ~1.5 sec/hash
rounds=15: ~3 sec/hash
rounds=25: ~1 hour/hash
rounds=31: 2-3 days/hash
```

# Saving password on database

Always store the hashed password.

About store the salt, exists different approach about _what_ store:

- A fix salt for all the user passwords.
- A salt per each user password.

and _where_:

- In the same database than password.
- In a different database.


In the case of _bcrypt_, it explore _A salt per each password_ and _In the same database than password_:

```js
var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds)
bcrypt.compareSync(myPlaintextPassword, hash) // true
```

Let's see how looks the hash has been generated:

```js
bcrypt.genSaltSync(10) // $2a$10$Yq0.l.cOsImF1s1kJL2IOe
bcrypt.genSaltSync(10) // $2a$10$Rtqb0Kjma5W93bDDJRUdO.
bcrypt.genSaltSync(11) // $2a$11$/7YSZ7uZH0ouTTDl4BAGve
```

The salt is part of the final hash.

![](http://dustwell.com/images/bcrypt_output_string2.png)

As you can see, it stores both the salt, and the hashed output in the string.

# Strong password in the user side

All this is useless if the input password is 12345.

Best trick that I know for that: auto-generate strong password per service using [1Password](https://1password.com/):

![](https://d17oy1vhnax1f7.cloudfront.net/items/3g0B2c0j2K3T360c1F0K/Screen%20Recording%202016-09-02%20at%2011.13%20am.gif?v=23905051)

# Bibliography

- [How To Safely Store A Password](https://codahale.com/how-to-safely-store-a-password/).
- [Storing User Passwords Securely](http://dustwell.com/how-to-handle-passwords-bcrypt.html).
- [Hacker101: Password Storage](https://www.hacker101.com/sessions/password_storage).
- [bcrypt.js](https://github.com/ncb000gt/node.bcrypt.js).
