nodejs-nzbmatrix
================

[Node.js](http://nodejs.org/) module for the [NZBMatrix](http://nzbmatrix.com/) API.


# Requirements

* NZBMatrix account with API key.
* Node.js :)


# Dependencies

None, the only module called is `https` which comes with Node.js.


# Installation & loading

## From NPM

```
npm install nzbmatrix
```
```js
var nzbmatrix = require('nzbmatrix')
```

## From Github

```
git clone https://github.com/fvdm/nodejs-nzbmatrix
```
```js
var nzbmatrix = require('/path/to/nodejs-nzbmatrix')
```


# Usage

```js
var nzbmatrix = require('nzbmatrix')
nzbmatrix.api.username = 'yourUsername'
nzbmatrix.api.key = 'yourAPIkey'

nzbmatrix.account( console.log )
```
```js
{ USERNAME: 'yourUsername',
  USERID: '987987',
  API_DAILY_RATE: '8',
  API_DAILY_DOWNLOAD: '0' }
```


# Methods

All methods take a `callback` function which will be called when results are ready.

## account
### ( callback )

```js
nzbmatrix.account( function( account ) {
	console.log( account.USERNAME )
	console.log( account.API_DAILY_RATE )
})
```

## bookmarks
### ( callback )

## search
### ( props, callback )

## post
### ( props, callback )

## download
### ( props, callback )


# License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>