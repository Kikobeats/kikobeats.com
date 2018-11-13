---
layout: post
title: Little UI Details
date: '2018-02-28'
image: https://i.imgur.com/jsILKdK.jpg
tags:
- design
---

## Color

[](https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886){:.card-preview data-image="logo"}
[](https://refactoringui.com/previews/building-your-color-palette/){:.card-preview data-image="logo"}

-  Use **color** and **weight** to create hierarchy instead of size.

![](https://i.imgur.com/3MfnkFs.png)

- Never use [black](https://ianstormtaylor.com/design-tip-never-use-black). Combine a palette based on a color, from *lightest* to *darkest*. I like generate palette colors using [palx](https://palx.jxnblk.com).

![](https://i.imgur.com/Xg6hOO7.png)

- Don’t use grey text on colored backgrounds. **Satinate** or **opacity** are better options. [Monochrome](https://monochrome.jxnblk.com) is a good tool for do that.

![](https://i.imgur.com/CANDnvL.png)

- Use **accent colors** (for example, at the border) to add color to a bland design.

![](https://i.imgur.com/M3lu0HW.png)

## Motion

[](https://medium.com/ux-in-motion/creating-usability-with-motion-the-ux-in-motion-manifesto-a87a4584ddc){:.card-preview}

[](https://medium.com/google-design/motion-design-doesnt-have-to-be-hard-33089196e6c2){:.card-preview}

- Transitions should be clear, simple, and coherent. **Quick**. They should avoid doing too much at once.

<video src="https://i.imgur.com/mU7bs46.mp4" autoplay="" loop=""></video>

- On mobile, a transition occur over **300ms**. On desktop the value should be around **200ms**.

<video src="https://i.imgur.com/Zjqho9p.mp4" autoplay="" loop=""></video>

- Transitions that exceed **400ms** may feel too slow.


## Typography

[](https://platzi.com/blog/tipografia/){:.card-preview}

- Choose your typography based on **legibility** and **context**.

![](https://i.imgur.com/alxHB24.png)

- Two font families are enough for distinguish between **heading** and **body**. A common pattern is use **Sans Serif** and **Sans** respectively. You can use [fontpair](https://fontpair.co) for do that.

![](https://i.imgur.com/NjQs5sO.png)

- Two font weights is usually enough: A **normal** font weight (400 or 500) and **bold** (600 or 700) for text you want to emphasize.

![](https://i.imgur.com/1FgZ6Hb.png)

- Font weights under 400 are **hard** to read.

## Shadows

[](https://material.io){:.card-preview}

- Instead of using large blur and spread values to make box shadows more noticeable, use subtle and accomplish the same goal without being as distracting.

![](https://i.imgur.com/hS0UJMl.png)

- If you need to use a **bright** background color, and white text on it, you can put the text a nice subtle shadow to make it more readable.

![](https://i.imgur.com/ITWcfYN.jpg)

- Use balance shadows, this means, it looks more natural. [Material Design](https://material.io/guidelines/material-design/elevation-shadows.html) has grateful [guidelines](https://codepen.io/sdthornton/pen/wBZdXq#code-area).

![](https://i.imgur.com/pgxcqSt.png)

## Buttons

[](https://codepen.io/tyrellrummage/full/ZJPXgy/){:.card-preview}

- Not every button needs a background color.

![](https://i.imgur.com/DsJUOhi.png)

- **Primary** actions should be obvious. Solid, high contrast background colors work great here.

- **Secondary** actions should be clear but not prominent. Outline styles or lower contrast background colors are great options.

- **Tertiary** actions should be discoverable but unobtrusive. Styling these actions like links is usually the best approach.
