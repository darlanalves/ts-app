'use strict';

var http = require('http');
var fs = require('fs');
var ecstatic = require('ecstatic');
var PORT = process.env.PORT || 80;
var bootstrapFile = fs.readFileSync('public/bootstrap.js', 'utf8');

http.createServer(handleRequest).listen(PORT);

function handleRequest(request, response) {
	var servePublic = ecstatic({
		handleError: false,
		root: __dirname + '/public'
	});

	var serveVendor = ecstatic({
		handleError: false,
		root: __dirname + '/'
	});

	var serveIndex = function(request, response, next) {
		// replace environment variables
		if (request.url === '/bootstrap.js') {
			var src = bootstrapFile.replace(/\{\{(.+)\}\}/g, function(a, name) {
				return process.env[name] || '';
			});

			response.writeHead(200, {
				'cache-control': 'max-age=3600'
			});

			response.write(src);
			response.end();
			return;
		}

		if (request.url === '/' || request.url === '') {
			fs.createReadStream('public/index.html').pipe(response);
			return;
		}

		next();
	};

	serveIndex(request, response, function() {
		servePublic(request, response, function() {
			serveVendor(request, response, function() {
				response.writeHead(404);
				response.end();
			});
		});
	})
}


console.log('Listening on ' + PORT);
