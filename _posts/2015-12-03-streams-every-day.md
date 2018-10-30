---
layout: post
title: Streams for every day
image: http://i.imgur.com/7O32Fbv.jpg
date: '2015-12-03 14:28:25'
tags:
- javascript
---

> "Streams in node are one of the rare occasions when doing something the fast way is actually easier. SO USE THEM. not since bash has streaming been introduced into a high level language as nicely as it is in node."
<cite>[@dominictarr](https://twitter.com/dominictarr) at [high level node style guide](https://gist.github.com/dominictarr/2401787).</cite>

## TL;DR

* Streams emits [Events](https://nodejs.org/api/events.html), the native observer pattern of NodeJS.

* At this moment exists 3 iterations of the Stream implementation that depend of your version of node/iojs.

* Instead of use the native API (that depend of your node version) better use [readable-stream](https://github.com/nodejs/readable-stream) or [through2](https://github.com/rvagg/through2). Both are backward compatibility and works fine in browser build. (this last is more lightweight because just expose a Duplex Stream).

* `.pipe()` is just a function that takes a readable source stream and hooks the output to a destination writable stream (as UNIX commands):

```js
tweetStream.pipe(process.stdout)
```

* Using `.pipe()` has other benefits too, like handling backpressure automatically so that node won't buffer chunks into memory needlessly when the remote client is on a really slow or high-latency connection.

* We have 4 types of Streams: [Duplex](https://nodejs.org/api/stream.html#stream_duplex), [Readable](https://nodejs.org/api/stream.html#stream_readable), [Transform](https://nodejs.org/api/stream.html#stream_transform) and [Writable](https://nodejs.org/api/stream.html#stream_writable).

* A good library that collect stream utilities are [mississippi](https://github.com/maxogden/mississippi).

* You can implement a [Stream using inheritance or composition](https://gist.github.com/Kikobeats/d48f42ebf81fb5b2414e).

## Readable

Streams from which data can be read (e.g [`fs.createReadStream()`](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)).

```js
const toReadableStream = input => (
  new Readable({
    read () {
      this.push(input)
      this.push(null)
    }
  })
)
```

* Readable streams produce data that can be fed into a writable, transform, or duplex stream by calling `.pipe()`

* For emit chunks of data you need to create a object that implement the [._read](https://nodejs.org/api/stream.html#stream_readable_read_size_1) method.

* It emits `data` events each time they get a *chunk* of data. From the implementation this is synonymous of `this.push(data)`.

* It emits `end` when it has no more data `this.push(null)`. In others words, the event `end` is triggered when the last chunk of data arrives, signifying that this is it and there is no more data after this last piece.

* When you are using a Readable Stream you can use `resume()` and `pause()` methods to control the data flow of the stream.

## Writable

Streams to which data can be written (e.g [`fs.createWriteStream()`](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options)).

* A writable stream is a stream you can `.pipe()` to but not from.

* For emit chunks of data you need to create a object that implement the [._write](https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback_1) method.

* `.end` to close the stream and also you can pass the last chunk to `.write`.

* Just provide the callback if you want to wait, but the order of the successive calls is guaranteed.

* The event `finish` is triggered when all the data has been processed (after end has been run and been processed).

## Duplex

Streams that are both Readable and Writable. Both are independent and each have separate internal buffer. (e.g [`net.Socket`](https://nodejs.org/api/net.html#net_class_net_socket)).

```
                             Duplex Stream
                          ------------------|
                    Read  <-----               External Source
            You           ------------------|   
                    Write ----->               External Sink
                          ------------------|
            You don't get what you write. It is sent to another source.
```

* It was implemented in the most recent node version but you can use [through2](https://github.com/rvagg/through2).

## Transform

Duplex streams where the output is in some way related to the input (e.g [zlib streams](https://nodejs.org/api/zlib.html)).

```
                                 Transform Stream
                           --------------|--------------
            You     Write  ---->                   ---->  Read  You
                           --------------|--------------
            You write something, it is transformed, then you read something.
```

## File System/Descriptor Streams

They are a subclass of Readable/Writable streams because they interact with the filesystem, emitting special kind of events

* uses `open` event to control the file state of the `fs.ReadStream`/`fs.WriteStream` streams.

## Child Process

* Also it's an especial kind of streams. They particulary fire `exit` event that is different from `close`.

* It uses `stdio` to setup stream communication between the child_process and where the output have to be write/read (by default `stdin`, `stdout` and `stderr` that are align with UNIX standard streams).

## What about Callback

* You can convert whatever stream interface into a callback. See my [stream-callback](https://github.com/Kikobeats/stream-callback#stream-callback) library that makes easy this conversion.

* It's also possible transform an async callback function into a stream interface. You need to be sure to handle correctly the backpressure of the stream. In my experience in this area I use [from2](https://github.com/hughsk/from2). Check [fetch-timeline](https://github.com/Kikobeats/fetch-timeline) or [totalwind-api](https://github.com/kikobeats/totalwind-api) as examples.

## Bonus Extra

Interested libraries to use with streams are:

* [progress-stream](https://www.npmjs.com/package/progress-stream), read the progress of a stream.
* [throughv](https://github.com/mcollina/throughv), stream.Transform with parallel chunk processing.
* [emit-stream](https://github.com/substack/emit-stream), turn event emitters into streams and streams into event emitters.
* [pretty-stream](https://github.com/mafintosh/pretty-stream), format a stream to make it more human readable.
* [squeak](https://github.com/kevva/squeak), a tiny stream log.
* [hyperquest](https://github.com/substack/hyperquest), make streaming http requests.

## Bibliography

* [Awesome Node.js Streams](https://github.com/thejmazz/awesome-nodejs-streams)

* [Streams @ Max Ogden](http://maxogden.com/node-streams.html)
* [Stream Handbook @ Substack](https://github.com/substack/stream-handbook)
* [Why I don't use Node's core 'stream' module @ rvagg](https://r.va.gg/2014/06/why-i-dont-use-nodes-core-stream-module.html)
