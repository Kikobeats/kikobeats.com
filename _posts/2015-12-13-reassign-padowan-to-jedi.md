---
layout: post
title: 'Reassign: Padowan to Jedi'
image: http://i.imgur.com/IOOX1zL.jpg
date: '2015-12-13 10:10:54'
tags:
- javascript
---

# Smelly Code

```javascript
data = this.appendAnalyticsData(data)
data = this.appendSubmissionData(data)
data = this.appendAdditionalInputs(data)
data = this.pruneObject(data)
```

# Nested Functions

```javascript
data = this.pruneObject(
  this.appendAdditionalInputs(
    this.appendSubmissionData(
      this.appendAnalyticsData(data)
    )
  )
)
```

# forEach

```javascript
var funcs = [
  this.appendAnalyticsData,
  this.appendSubmissionData,
  this.appendAdditionalInputs,
  this.pruneObject
]

funcs.forEach(function (func) {
  data = func(data)
})
```

# Reduce

```javascript
var funcs = [
  this.appendAnalyticsData,
  this.appendSubmissionData,
  this.appendAdditionalInputs,
  this.pruneObject
]

data = funcs.reduce(function (memo, func) {
  return func(memo)
}, data)
```

# Flow

```javascript
data = _.flow(
  this.appendAnalyticsData,
  this.appendSubmissionData,
  this.appendAdditionalInputs,
  this.pruneObject
)(data)
```

# Bibliography

- [Eliminate JavaScript Code Smells by elijahmanor](http://elijahmanor.com/talks/js-smells/#/).
- [lodash#flow](https://lodash.com/docs#flow).
