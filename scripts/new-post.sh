#!/usr/bin/env bash

title=$1
year=$(date +%Y)
month=$(date +%m)
day=$(date +%d)
filename="_posts/$year-$month-$day-$title.md"

header=$(cat <<EOF
---
layout: post
title: $title
date: '$year-$month-$day'
image: https://i.imgur.com/CFKl9PT.jpg
---

hello world

## Bibliography

- [item](url)
EOF
)

echo "$header" > "$filename"
