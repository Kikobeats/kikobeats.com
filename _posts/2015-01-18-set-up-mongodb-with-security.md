---
layout: post
title: Set Up MongoDB with Security
image: http://i.imgur.com/g6MSv5k.png
date: '2015-01-18 21:19:25'
tags:
- database
---

First run mongodb instance:

```bash
mongod
```
 
In a secondary terminal, connect ad Add global admin:

```
mongo
use admin
db.createUser(
    {
      user: "myAdmin",
      pwd: "myPassword",
      roles: [ "root" ]
    }
)
```

Run again the process with `auth` privileges:
 
```
mongod --auth
```
 
Connect with secondary terminal using your credentials:

```
mongo admin -u 'myAdmin' -p 'myPassword'
```
 
Create a new user for a specific database:

```
use myDatabase
db.createUser(
    {
      user: "myDatabaseAdmin",
      pwd: "myPassword",
      roles: [ {role: "readWrite", db: "myDatabase" }]
    }
)
```

Shutdown the process. It's moment to set the auth configuration in mongoDB configuration file instead to lift the process with flags.

Open the file `/etc/mongod.conf ` and search the lines:

```
port = 23794 // Put a random free port. You can use portFinder (npm install -g port-finder)
bind_ip = 0.0.0.0 // Use your IP to acces remotely
auth = true // enable security auth mode
```

Restart MongoDB process:

```
service mongod restart
```

Achievement unlocked! Security access activated!