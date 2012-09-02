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
				var data = ''
				response.on( 'data', function( chunk ) { data += chunk })
				response.on( 'end', function() {
					data = data.toString('utf8').trim().split('\n')
					if( typeof data == 'object' && data.length !== undefined ) {
						var result = {}
						
						for( var i in data ) {
							var line = data[i]
							var div = line.indexOf(':')
							result[ line.slice(0, div) ] = line.slice( div +1, -1 )
						}
						
						if( typeof props.onSuccess == 'function' ) {
							props.onSuccess( result )
						}
					}
				})
			}
		).end()
	},
	
	account: function() {},
	
	bookmarks: function() {},
	
	search: function() {},
	
	post: function() {},
	
	download: function() {}
}

// !export
module.exports = app
