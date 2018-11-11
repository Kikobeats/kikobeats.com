---
layout: post
title: What Is URI
image: https://i.imgur.com/DvqYaeM.png
date: '2016-10-15 09:57:40'
tags:
- computer-science
---

# URI (Uniform Resource Identifier)

![](https://i.imgur.com/ObD8dK2.jpg)

URIs are a standard for identifying documents using a short string of numbers, letters, and symbols. They are defined by [RFC 3986 - Uniform Resource Identifier (URI): Generic Syntax](https://tools.ietf.org/html/rfc3986). **URLs**, **URNs**, and **URCs** are all types of **URI**.

For example, Bitorrent files are identified by [Magnet URI](https://en.wikipedia.org/wiki/Magnet_URI_scheme) because the protorcol was designed for non know where is the resource.

## URL (Uniform Resource Locator)

Contains information about how to fetch a resource from its location. For example:

* `http://example.com/mypage.html`
* `ftp://example.com/download.zip`
* `mailto:user@example.com`
* `file:///home/user/file.txt`
* `http://example.com/resource?foo=bar#fragment`
* `/other/link.html`

URLs **always** start with a protocol (*http*) and usually contain information such as the network host name (`example.com`) and often a document path (`/foo/mypage.html`). 

URLs may have query parameters and fragment identifiers.

## URN (Uniform Resource Name)

Identifies a resource by a unique and persistent name, but doesn't necessarily tell you how to locate it on the internet. It usually starts with the prefix `urn`. For example:

* `urn:isbn:0451450523` to identify a book by its ISBN number.
* `urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66` a globally unique identifier
* `urn:publishing:book` - An XML namespace that identifies the document as a type of book.

## URC (Uniform Resource Citation)

Points to meta data about a document rather than to the document itself. An example of a URC is one that points to the HTML source code of a page like: `view-source:http://example.com/`.

# About W3C

The W3 spec for HTML says that the [`href` of an anchor tag](http://www.w3.org/TR/html401/struct/links.html#h-12.2) can contain a URI, not just a URL. You should be able to put in a URN such as `<a href="urn:isbn:0451450523">`. 

Your browser would then resolve that URN to a URL and download the book for you.

The W3C realized that there is a ton of confusion about this. They issued a [URI clarification document](http://www.w3.org/TR/uri-clarification/) that says that it is now OK to use the terms URL and URI interchangeably (to mean URI). It is no longer useful to strictly segment URIs into different types such as URL, URN, and URC.

In addition, when you something like `google.com` in your browser that is not currently an URL (because URL's need to be identified with a protocol) but the browser known how to resolve that.

# Related modules I wrote

* [parse-uri](https://github.com/kikobeats/parse-uri) â€“ Lightweight module for parse an URI.
* [is-uri](https://github.com/kikobeats/is-uri) â€“ Determinate if a string is a valid URI.

# Bibliography

* @ Stackoverlfow [[1]](http://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn/1984225#1984225)
[[2]](http://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn).
* [@ Nacho Soto](https://twitter.com/NachoSoto/status/787043395747188736) inception.
