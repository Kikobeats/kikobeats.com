# Data Structures 101

## Big O Notation

**Big-O** Notation is a way of roughly measuring the performance of algorithms in order to compare one against another when discussing them.

There are two primary things that you measure with Big-O:
 
- **Time complexity** refers to the total count of operations an algorithm will perform given a set of items.

- **Space complexity** refers to the total memory an algorithm will take up while running given a set of items.

We measure these independently from one another because while an algorithm may perform less operations than another, it may also take up way more memory. Depending on what your requirements are, one may be a better choice than the other.

| Name         | Notation   | Human Notation |
|--------------|------------|----------------|
| Constant     | O(1)       | AWESOME!!      |
| Logarithmic  | O(N)       | GREAT!         |
| Linear       | O(log N)   | OKAY.          |
| Linearithmic | O(N log N) | UGH...         |
| Polynomial   | O(N ^ 2)   | SHITTY         |
| Exponential  | O(2 ^ N)   | HORRIBLE       |
| Factorial    | O(N!)      | WTF            |

## Basic Data Structure

With data structures, you can perform 4 primary types of actions: Accessing, Searching, Inserting, and Deleting.

It is important to note that data structures may be good at one action but bad at another.

| Data Structure     | Accessing        | Searching        | Inserting       | Deleting        |
| ------------------ | ---------------- | ---------------- | --------------- | --------------- |
| Array              | O(1) AWESOME!!   | O(N) OKAY        | O(N) OKAY       | O(N) OKAY       |
| Linked List        | O(N) OKAY        | O(N) OKAY        | O(1) OKAY       | O(1) AWESOME!!  |
| Binary Search Tree | O(log N) GREAT!  | O(log N) GREAT!  | O(log N) GREAT! | O(log N) GREAT! |

**There is no perfect data structure**. You choose one over another based on the data that you are working with and the things you are going to do with it. 

This is why it is important to know a number of different common data structures so that you can choose from them.

## Case of Study

### Least Recently Used

Also known as **LRU**, it's one of the most famous [cache algorithm](https://en.wikipedia.org/wiki/Cache_replacement_policies). Particularly, it discards the least recently used items first.

A classical LRU implementation needs to combine two data structures:

- **Double Linked List**: It maintains the least recent list of items.
- **Hash Table**: It keeps the data for easily access to cache content.

I created an abstract JavaScript implementation called [hyperlru](https://github.com/Kikobeats/hyperlru) and you can backed them using [object](https://github.com/Kikobeats/hyperlru-object) or [map](https://github.com/Kikobeats/hyperlru-map).

### Self-balancing binary search tree

There is a specific family of binary search trees with the particularity of [self-balancing](https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree).

We can feature two kind of these trees:

- [AVL Tree](https://en.wikipedia.org/wiki/AVL_tree).
- [Red Black Tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree).

Meanwhile both are based in the same principle, AVL Tree balanced the content in every insertion and Red Black Tree perform the maintained action of balanced the tree  just when the searching operation is being degraded in terms of perfomance.

If add/delete of nodes is a frequent, then a RedBlack Tree performs better: less rotations to balance the overall height.

### Algorithms for sorting

There are an absurd number of algorithms for sorting a set of unordered items:

Insertion Sort,  Selection Sort Merge Sort, Bubble Sort, Heap Sort, Quick Sort, Shell Sort, TimSort, Bucket Sort, Radix Sort, ....

Then, what's is better? You not going to believe me, but it depends.

## Bibliography

- [Itsy Bitsy Data Structures](https://github.com/thejameskyle/itsy-bitsy-data-structures).
- [Big O Cheatsheet](http://bigocheatsheet.com).