'use strict';

var http = require('http');
var ecstatic = require('ecstatic');
var PORT = process.env.PORT || 80;

http.createServer(
	ecstatic({
		root: __dirname + '/public'
	})
).listen(PORT);

console.log('Listening on ' + PORT);
