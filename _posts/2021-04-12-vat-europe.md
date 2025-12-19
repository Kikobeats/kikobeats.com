---
layout: post
title: Applying VAT in Europe
date: '2021-04-12'
og_image:
  canvas:
    background_image: /images/applying-vat-in-europe/header.jpeg
---

## How to avoid going to jail

Let's say you’re a EU based company that has sold a digital product priced at €25. 

Your invoices should have **VAT included** (€25 + VAT based on customer location) when:

  - Your customer lives in your country.
  - Your customer lives in another EU country and doesn’t have a VAT number.

Your invoices should have **VAT exempted** when:

  - Your customer lives in another EU country and does have a VAT number.
  - Your customer lives outside EU.

## Complementary considerations

- If your business stays below €10,000 in cross-border sales of digital goods per year, throughout the EU, then you can charge the VAT rate of your home country on all those cross-border sales, keeping your tax scheme simple.
- The taxes of a digital product have to be applied in a exclusive way, othwerwise you're assuming dynamic pricing based on customer location.
- B2C and B2B have different implications in terms of VAT.

## State of the Art

If you are using Stripe, they've started rolling [tax](https://stripe.com/tax) feature to reduce the friction on your side. Alternatively, I wrote some software to simplify the things:

- [req-country](https://github.com/Kikobeats/req-country) – Given a request, get the country associated with it. ISO 3166-1 alpha-2 compliant.
- [country-vat](https://github.com/Kikobeats/country-vat) – Given a request, get the country associated with it. ISO 3166-1 alpha-2 compliant.
- [is-european](https://github.com/Kikobeats/is-european) – Check if a country is part of the EU (European Union) or EEA (European Economic Area). ISO 3166-1 compliant.
- [tom.js.org](https://tom.js.org) – tom 🐶 is a backoffice for your projects.

## Bibliography

- [Selling digital goods to customers in Europe](https://web.archive.org/web/20201111163616/https://quaderno.io/stripe-vat-invoicing/).
- [The Ultimate Guide to EU VAT for Digital Taxes](https://www.quaderno.io/resources/eu-vat-guide).
