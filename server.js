'use strict';

var http = require('http');
var fs = require('fs');
var ecstatic = require('ecstatic');
var PORT = process.env.PORT || 80;

http.createServer(handleRequest).listen(PORT);

function handleRequest (request, response) {
	var servePublic = ecstatic({
		handleError: false,
		root: __dirname + '/public'
	});

	var serveVendor = ecstatic({
		handleError: false,
		root: __dirname + '/'
	});

	var serveIndex = function (request, response, next) {
		if (request.url === '/' || request.url === '') {
			fs.createReadStream('public/index.html').pipe(response);
			return;
		}

		next();
	};

	serveIndex(request, response, function () {
		servePublic(request, response, function () {
			serveVendor(request, response, function () {
				response.writeHead(404);
				response.end();
			});
		});
	})
}


console.log('Listening on ' + PORT);
