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
	console.log( account.USERNAME +' : '+ account.API_DAILY_RATE +' API calls' )
})
```


## bookmarks
### ( action, nzbID, callback )

Add or remove a bookmark from your account.

```js
nzbmatrix.bookmarks( 'add', 123, console.log )
```


## search
### ( props, callback )

Search the database. This method always returns an array with objects.

**props:** ([docs](http://nzbmatrix.com/api-info.php))
```
search      : search term
catid       : if left blank all categories are searched, category ID used from site.
num         : if left blank a maximum of 5 results will display, 5 is the maximum number of results that can be produced.
age         : if left blank full site retention will be used. Age must be number of "days" eg 200
region      : if left blank results will not be limited 1 = PAL, 2 = NTSC, 3 = FREE
group       : if left blank all groups will be searched, format is full group name "alt.binaries.X"
larger      : minimum size in MB
smaller     : maximum size in MB
minhits     : minimum hits
maxhits     : maximum hits
maxage      : same as &age (above) here for matching site search vars only
englishonly : if '1' the search will only return ENGLISH and UNKNOWN matches
searchin    : (name, subject, weblink) if left blank or not used then search filed is "name"
```

**Example:**

```js
nzbmatrix.search(
	{
		search:	'ubuntu',
		catid:	20
	},
	function( results ) {
		for( var i in results ) {
			var item = results[i]
			console.log( item.NZBID +' - '+ item.NZBNAME )
		}
	}
)
```


## post
### ( nzbid, callback )

Get details about a NZB post.

```js
nzbmatrix.post( 123, console.log )
```


## download
### ( props, callback )


## talk
### ( props )

Directly communicate with the API.

**props** is an object with the following properties:

```
path       : required - Method path, ie. search.php
fields     : optional - Method parameters, ie. {id: 123}
onSuccess  : optional - Callback function for results, only called on successful response
```

```js
nzbmatrix.talk({
	path:		'bookmarks.php',
	fields: {
		id:		123,
		action:	'add'
	},
	onSuccess:	function( res ) {
		console.log( res.RESULT || res.error )
	}
)
```


# Unlicense

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