
/**
 * server.js
 *
 * A test server for local automate testing
 */

var http = require('http');
var parse = require('url').parse;

module.exports = TestServer;

function TestServer() {
	this.server = http.createServer(this.router);
	this.port = 40001;
	this.hostname = 'localhost';
	this.server.on('error', function(err) {
		console.log(err.stack);
	});
}

TestServer.prototype.start = function(cb) {
	this.server.listen(this.port, this.hostname, cb);
}

TestServer.prototype.stop = function(cb) {
	this.server.close(cb);
}

TestServer.prototype.router = function(req, res) {
	var p = parse(req.url).pathname;

	if (p === '/hello') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.end('world');
	}

	if (p === '/inspect') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		var body = '';
		req.on('data', function(c) { body += c });
		req.on('end', function() {
			res.end(JSON.stringify({
				method: req.method,
				url: req.url,
				headers: req.headers,
				body: body
			}));
		});
	}
}
