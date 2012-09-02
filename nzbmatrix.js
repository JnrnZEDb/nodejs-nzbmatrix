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
	
	talk: function( props, cb ) {
		var fields = props.fields || {}
		fields.username = app.api.username
		fields.apikey = app.api.key
		
		var req = https.request(
			{
				host:		app.api.host,
				port:		app.api.port || 443,
				path:		app.api.path +'?'+ querystring.stringify( fields ),
				agent:		false
			},
			function( response ) {
				var data = ''
				response.on( 'data', function( chunk ) { data += chunk })
				response.on( 'end', function() {
					cb( data.toString('utf8').trim() || '' )
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