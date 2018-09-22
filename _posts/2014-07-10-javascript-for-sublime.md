---
layout: post
title: Javascript for Sublime
date: '2014-07-10 06:05:14'
tags:
- computer-science
---

![](http://i.imgur.com/zcJn6x2.png)

### [Better Javascript](https://sublime.wbond.net/packages/Better%20JavaScript)

JavaScript have many ways to do something and sometimes Sublime Text can't interpeter good your Javascript code. For Example, If you define methods with `prototype` and try to use `cmd + R` shortcut to access it isn't possible. In general this plugin fix this type of errors an convert this:

![](http://int3h.github.io/sublime-better-javascript/images/screenshot-bad-symbols.png)

in this:

![](http://int3h.github.io/sublime-better-javascript/images/screenshot-good-symbols.png)

### [JavaScript Snippets](https://sublime.wbond.net/packages/JavaScript%20Snippets)

Suite of basics snippets for common actions in JavaScript.

```
[afn] anonymous function

function(${1:arguments}) {
    ${0:// body...}
}
[cd] console.dir

console.dir(${1:obj})${0}
[ce] console.error

console.error(${1:error})${0}
[cl] console.log

console.log(${1:msg})${0}
[cli] console.log with util.inspect

console.log(require('util').inspect(${1:obj}, true, ${2:10}, true))${0}
[ct] console.trace

console.trace(${1:msg})${0}
[fn] function

function ${1:methodName}(${2:arguments}) {
    ${0:// body...}
}
[ii] Immediately-invoked function expression

(function () {
    ${0:// body...}
})();
[me] module.exports

module.exports = ${1}
[okfe] Objects.keys and forEach

Object.keys(${1:obj}).forEach(function(key) {
    ${0:// body...}
})
[pe] process.exit

process.exit()
[proto] prototype

${1:ClassName}.prototype.${2:methodName} = function(${3:arguments}) {
    ${0:// body...}
}
[req] require

require('${1:package}')${0}
[sto] setTimeout

setTimeout(function() {
    ${2:// body...}
}, ${1:millis})
[sti] setInterval

setInterval(function() {
    ${2:// body...}
}, ${1:millis})
[us] use strict

'use strict'
Behaviorial Driven Development

[desc] describe

describe('${1:description}', function() {
    ${0:// body...}
})
[ita] asychronous it

it('${1:description}', function(done) {
    ${0:// body...}
})
[its] synchronous it

it('${1:description}', function() {
    ${0:// body...}
})
```

### [JavaScript Console](https://sublime.wbond.net/packages/JavaScript%20Console)

Improve your worfklow with snippets for all method of the console and greate way to call it.

![](https://raw.github.com/caiogondim/js-console-sublime-snippets/master/snippets.gif)

```js
/* Methods covered */

console.assert()
console.clear()
console.count()
console.debug()
console.dir()
console.dirxml()
console.error()
console.exception()
console.group()
console.groupCollapsed()
console.groupEnd()
console.info()
console.log()
console.profile()
console.profileEnd()
console.tab()
console.table()
console.time()
console.timeEnd()
console.timeStamp()
console.warn()
```

Also include the snippets for CoffeeScript.

### [JavaScript & NodeJS Snippets](https://sublime.wbond.net/packages/JavaScript%20%26%20NodeJS%20Snippets)

Snippets for manipulate the DOM and good snippets for NodeJS. If you decide install only a one package of snippets, this is the key.

![](https://cloud.githubusercontent.com/assets/398893/3528110/d55390be-078b-11e4-8587-db23277b50af.gif)

List of Snippets:

```
Console

[cd] console.dir

console.dir(${1:obj});
[ce] console.error

console.error(${1:obj});
[cl] console.log

console.log(${1:obj});
[cw] console.warn

console.warn(${1:obj});
DOM

[ae] addEventListener

${1:document}.addEventListener('${2:event}', function(e) {
    ${3}
});
[ac] appendChild

${1:document}.appendChild(${2:elem});
[rc] removeChild

${1:document}.removeChild(${2:elem});
[cel] createElement

${1:document}.createElement(${2:elem});
[cdf] createDocumentFragment

${1:document}.createDocumentFragment(${2:elem});
[ca] classList.add

${1:document}.classList.add('${2:class}');
[ct] classList.toggle

${1:document}.classList.toggle('${2:class}');
[cr] classList.remove

${1:document}.classList.remove('${2:class}');
[gi] getElementById

${1:document}.getElementById('${2:id}');
[gc] getElementsByClassName

${1:document}.getElementsByClassName('${2:class}');
[gt] getElementsByTagName

${1:document}.getElementsByTagName('${2:tag}');
[ga] getAttribute

${1:document}.getAttribute('${2:attr}');
[sa] setAttribute

${1:document}.setAttribute('${2:attr}', ${3:value});
[ra] removeAttribute

${1:document}.removeAttribute('${2:attr}');
[ih] innerHTML

${1:document}.innerHTML = '${2:elem}';
[tc] textContent

${1:document}.textContent = '${2:content}';
[qs] querySelector

${1:document}.querySelector('${2:selector}');
[qsa] querySelectorAll

${1:document}.querySelectorAll('${2:selector}');
Loop

[fe] forEach

${1:myArray}.forEach(function(${2:elem}) {
    ${3}
});
[fi] for in

for (${1:prop} in ${2:obj}) {
    if (${2:obj}.hasOwnProperty(${1:prop})) {
        ${3}
    }
}
Function

[fn] function

function ${1:methodName}(${2:arguments}) {
    ${3}
}
[afn] anonymous function

function(${1:arguments}) {
    ${2}
}
[pr] prototype

${1:ClassName}.prototype.${2:methodName} = function(${3:arguments}) {
    ${4}
}
[iife] immediately-invoked function expression

(function(window, document, undefined) {
    ${1}
})(window, document);
[call] function call

${1:methodName}.call(${2:context}, ${3:arguments})
[apply] function apply

${1:methodName}.apply(${2:context}, [${3:arguments}])
[ofn] function as a property of an object

${1:functionName}: function (${2:arguments}) {
    ${3}
}
Timer

[si] setInterval

setInterval(function() {
    ${2}
}, ${1:delay});
[st] setTimeout

setTimeout(function() {
    ${2}
}, ${1:delay});
NodeJS

[ase] assert.equal

assert.equal(${1:actual}, ${2:expected});
[asd] assert.deepEqual

assert.deepEqual(${1:actual}, ${2:expected});
[asn] assert.notEqual

assert.notEqual(${1:actual}, ${2:expected});
[me] module.exports

module.exports = ${1:name};
[pe] process.exit

process.exit(${1:code});
[re] require

require('${1:module}');
BDD

[desc] describe

describe('${1:description}', function() {
    ${2}
});
[ita] it asynchronous

it('${1:description}', function(done) {
    ${2}
});
[its] it synchronous

it('${1:description}', function() {
    ${2}
});
Misc

[us] use strict

'use strict';
[al] alert

alert('${1:msg}');
[pm] prompt

prompt('${1:msg}');
```

### [Tern for Sublime](https://sublime.wbond.net/packages/tern_for_sublime)

Javascript Autocompletion for Sublime Text. Don't work totally nice (because JavaScript is too dynamic to do this) but is better than nothing.

You can try a demo [here](http://ternjs.net/doc/demo.html).

### [Sublimelinter for Javascript](https://sublime.wbond.net/packages/SublimeLinter-jshint)

![](http://www.jshint.com/res/jshint-dark.png)

Linter is basic to write good code, and JSHint is the best linter for JavaScript . You must use it!

### [SublimeCodeIntel](https://sublime.wbond.net/packages/SublimeCodeIntel)

Improve autocompletion. Complementary to TernJS and support more languages, like:

```

JavaScript, Mason, XBL, XUL, RHTML, SCSS, Python, HTML, Ruby, Python3, XML, Sass, XSLT, Django, HTML5, Perl, CSS, Twig, Less, Smarty, Node.js, Tcl, TemplateToolkit, PHP.
```

### [JS Format](https://sublime.wbond.net/packages/JsFormat)

I'm obsessive of the clean code. This plugin format your code for you. This plugin is based on the website [jsbeautifier](http://jsbeautifier.org/) and really works fine. Remember configure it and don't auto format JS files on save, breaks all open source proyects!

**BONUS**: Use [Editorconfig](http://editorconfig.org/) to set up the identation style of your proyect.
