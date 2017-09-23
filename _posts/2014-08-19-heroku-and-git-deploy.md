---
layout: post
title: '101: Survive a deploy with Heroku and Git'
date: '2014-08-19 08:06:18'
tags:
- unix
---

![](http://i.imgur.com/lwa0UZ8.png)

### Useful commands

#### Clone a remote repository

```
heroku git:clone -a myapp
```

#### Logs in real time
```
heroku logs --tail --app=appName
```

#### Active production mode for Nodejs projects
```
heroku config:set NODE_ENV=production --app=appName
```

#### Restart application
```
heroku restart --app=appName
```

#### Setting scale
```
heroku ps:scale web=1 --app=appName
```

#### Added remote heroku repository
```
heroku git:remote -a appName
```

<space-medium></space-medium>

![](http://git-scm.com/images/logos/downloads/Git-Logo-1788C.png)

### Bonus: Git submodules

Git submodules are very useful when you need manage Git dependencies.

#### Add a submodule
```
git submodule add git://github.com/chneukirchen/rack.git rack
```

#### Update submodules to HEAD

```
git submodule foreach git pull origin master
```


#### Delete a submodule

```
git submodule deinit asubmodule    
git rm asubmodule
git rm --cached asubmodule
```