---
layout: post
title: Introducing microlink.io
date: '2017-10-29 11:00:00'
image: https://kikobeats.com/images/microlink-post.jpg
tags:
- product
---

Months ago, I decided move for create [very downloaded but questionably useful npm packages](https://www.npmjs.com/package/emojis-list) to use these packages in create real projects. Something that I can show to my mum.

These kind of projects have sense for me because:

- They are simples but very focused project in do one thing well.
- They are a safe zone for try new/experimental technologies.
- You are continuous learning in what you want.
- Why not.

The most important thing that I learned is, even you think you are a programmer guy, **programming is just 1/3 of all the time you need to invest in the project**.

Launch a successful side project is a problem more related with **execution**, not programming.

Today, I going to be excited to launch my latest project, [microlink.io](https://microlink.io) and show you what I learned.

## What is microlink.io

[https://microlink.io](microlink.io) get relevant infromation from any link.


Taking a whatever [url](https://docs.microlink.io/#url) as input, it will extract structured and normalized information related with the link, like:

- Author.
- Description.
- Title.
- Logo.
- Featured image.

Complementary it can do extra but fancy actions, like:

- [Embed](https://docs.microlink.io/#embeded-support) content directly in your HTML markup.
- Take website [screenshot](https://docs.microlink.io/#screenshot) (full or partial page).
- Get predominant [palette colors](https://docs.microlink.io/#palette) per each image detected.
- PDF export (*soon!*).

The way to interact with [microlink.io](https://microlink.io) is based a simple [API](https://docs.microlink.io) microservice:

```bash
$ curl https://api.microlink.io?url=https://microlink.io
```

The response of this API call will be something like:

```json
{
	"status": "success",
	"data": {
		"author": null,
		"date": null,
		"description": "Turns any link into information.",
		"favicon": "https://microlink.io/favicon.ico",
		"image": {
			"width": 438,
			"height": 220,
			"type": "png",
			"url": "https://microlink.io/preview.png"
		},
		"logo": {
			"width": 400,
			"height": 400,
			"type": "png",
			"url": "https://d33wubrfki0l68.cloudfront.net/4be8a26507e779272b76c8427a86066bd1bc7346/168e4/logo.png"
		},
		"publisher": "Turns any link into information.",
		"title": "microlink",
		"url": "https://microlink.io"
	}
}
```

One of the thing that I like more about microlink is that you can [embed](https://docs.microlink.io/#embeded-support) the content directly in your website, doing nothing extra.

Do you see the `image` field from the response? Let's use it directly in this blog post. 

```html
<img src="https://api.microlink.io/?url=https%3A%2F%2Fmicrolink.io&embed=image.url" />
```

voilá!

<img src="https://api.microlink.io/?url=https%3A%2F%2Fmicrolink.io&embed=image.url" />

## How is made microlink.io

### Codebase

It's the more technical part.

When you provide a link, microlink will be get the HTML content of the website and apply a set of **rules** for recover specific fields present in the HTML.

For example, we going to suppose we want to extract `title`. We can extract the value from different HTML tags:

- `og:title`
- `twitter:title`
- `title`
- `.post-title`
- `h1[class*="title`

... and more tricky selectors to get the value from all the website in the world.

One important thing here is **testing**: Each website is different and we need to be sure we extract the right value per each field.

We tested a lot of websites and adjust the value for best effort. Of course it's not perfect, but probably is because the input HTML is wrong or missing.

A funny thing I discovered working on this part is that **it's incredible how badly looks the HTML from the top websites in the world**. They are not putting attention or doing any effort in have semantic and logical HTML markup.

microlink codebase is based on [metascrapper](https://github.com/ianstormtaylor/metascraper) (where I'm contributor). Thanks [Ian Storm Taylor](https://twitter.com/ianstormtaylor) for create it, It's very inspirational.

Probably I'm going to release this part in the future because it will be improved a lot adopting an open source community.

### Landing Page

The website that can see  [microlink.io](https://microlink.io). 

Probably **the landing page for a project is the most important part**. It will be resume all the effort. 

I think we tends to create landing pages at the end of the process and we don't put all the attention that it needs: You are thinking in finish the project as soon as possible, but you need to keep in mind that **landing page will be last thing for you but the first thing people see**.

I have to say special thanks to [Danny Saltaren](https://twitter.com/dsaltaren) and [mendesaltaren](https://www.mendesaltaren.com) team to helping me with the design. It's better than I ever imagined.

Feedback in these step is very important: You need to validate how it looks before the launch day. I want to say thanks again to [Frontaneros community](https://github.com/Frontaneria) to provide me a lot of useful feedback.

The source code is [available on GitHub](https://github.com/microlinkhq/www). 

### Documentation

microlink is not oriented specifically for developers, but it's necessary resource area with all the information about what you can do with the [API](https://docs.microlink.io/#getting-started).

Like the landing page, these part is very important: **something that you don't documented basically don't exist**.

Write human readable documentation is not easy: It needs to be simple, with a clear intention, well structured, with enough example and as complete as possible. 

Also, when you update your codebase, you need to reflect the changes in the documentation, so I takes an extra task of maintain.

Again, the [source code is available on GitHub](https://github.com/microlinkhq/docs).
