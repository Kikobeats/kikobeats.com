#!/bin/bash

title=$1
year=$(date +%Y)
month=$(date +%m)
day=$(date +%d)
filename="_posts/$year-$month-$day-$title.md"

# header=$(cat <<-END
# ---\nlayout: post\ntitle: $title\ndate: '$year-$month-$day'\nimage: https://i.imgur.com/CFKl9PT.jpg\n---
# END
# )

header="---\n
layout: post\n
title: $title\n
date: '$year-$month-$day'\n
image: https://i.imgur.com/CFKl9PT.jpg\n---
\nHello world\n\n## Bibliography\n\n- [item](url)\n\n"


echo $header > $filename
