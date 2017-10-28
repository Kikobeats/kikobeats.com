---
layout: post
title: Database fundamentals
image: https://i.imgur.com/hZGmR2N.jpg
tags:
- database
---

https://audiense.slack.com/archives/D046DJ8BR/p1476106707000109

Any database engine share a set of properties that are intrinsic to the database engine used. It's very important know this properties and how it works in your specific engine to know what or not.

#Â Transaction

A transaction is a unit of work that you want to treat as "a whole". It has to either happen in full, or not at all.

Transactions ideally have four properties, commonly known as **ACID**.

Also, For do it, transactions uses a [journal](https://en.wikipedia.org/wiki/Transaction_log) that content all the transaction history. This makes easy do rollback.

A little schema of transaction could be:

1. Begin the transaction.
2. Execute a set of data manipulations and/or queries.
3. If no errors occur then commit the transaction and end it.
4. If errors occur then rollback the transaction and end it.

If no errors occurred during the execution of the transaction then the system commits the transaction.

# ACID

## Atomicity

## Consistency

## Isolation

## Durability

