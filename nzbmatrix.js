/*
Name:     nodejs-nzbmatrix
Source:   https://github.com/fvdm/nodejs-nzbmatrix
Feedback: https://github.com/fvdm/nodejs-nzbmatrix/issues
License:  Unlicence / Public Domain

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
*/

var https = require('https'),
    querystring = require('querystring')

var app = {
	api: {
		host:		'api.nzbmatrix.com',
		port:		443,
		path:		'/v1.1/',
		username:	'',
		key:		''
	},
	
	limit: {},
	
	talk: function( props ) {
		var fields = props.fields || {}
		fields.username = app.api.username
		fields.apikey = app.api.key
		
		var req = https.request(
			{
				host:		app.api.host,
				port:		app.api.port || 443,
				path:		app.api.path + props.path +'?'+ querystring.stringify( fields ),
				agent:		false
			},
			function( response ) {
				var result, data = ''
				
				response.on( 'data', function( chunk ) { data += chunk })
				response.on( 'end', function() {
					
					// refresh limits
					app.limit = {}
					for( var header in response.headers ) {
						if( header.substr(0, 4) == 'api_' ) {
							app.limit[ header ] = response.headers[ header ]
						}
					}
					
					if( response.headers['content-type'] == 'application/x-nzb' ) {
					
						// NZB XML
						result = data.toString('utf8')
						
					} else {
						
						// object
						data = data.toString('utf8').trim().split('\n|\n')
						if( data[1] !== undefined ) {
						
							// multiple results
							result = []
							for( var i in data ) {
								var item = data[i].split('\n')
								
								var result_item = {}
								for( var d in item ) {
									var line = item[d]
									var div = line.indexOf(':')
									var key = line.slice(0, div)
									if( key != '' ) {
										result_item[ key ] = line.slice( div +1, -1 )
									}
								}
								result.push( result_item )
							}
							
						} else {
							
							// just one
							result = {}
							item = data[0].split('\n')
							for( var d in item ) {
								var line = item[d]
								var div = line.indexOf(':')
								var key = line.slice(0, div)
								if( key != '' ) {
									result[ key ] = line.slice( div +1, -1 )
								}
							}
							
						}
						
					}
					
					// done
					if( typeof props.onSuccess == 'function' ) {
						props.onSuccess( result )
					}
				})
			}
		).end()
	},
	
	account: function( cb ) {
		app.talk({
			path:		'account.php',
			onSuccess:	cb
		})
	},
	
	bookmarks: function( action, nzbid, cb ) {
		app.talk({
			path:		'bookmarks.php',
			onSuccess:	cb,
			fields: {
				id:		nzbid,
				action:		action
			}
		})
	},
	
	search: function( props, cb ) {
		app.talk({
			path:		'search.php',
			fields:		props,
			onSuccess:	function( results ) {
				var res = {}
				if( results && results[0] === undefined ) {
					res[ results.NZBID ] = results
					var res = []
					res.push( results )
					results = res
				}
				cb( results )
			},
		})
	},
	
	post: function( nzbid, cb ) {
		app.talk({
			path:		'details.php',
			onSuccess:	cb,
			fields: {
				id:	nzbid
			}
		})
	},
	
	download: function() {}
}

// !export
module.exports = app
