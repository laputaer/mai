
/**
 * server.js
 *
 * A test server for local automate testing
 */

var fs = require('mz/fs');
var http = require('http');
var parse = require('url').parse;
var fixture_dir = process.cwd() + '/components/tests/fixtures/';

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

	if (p === '/empty') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.end();
	}

	if (p === '/error') {
		res.statusCode = 500;
		res.setHeader('Content-Type', 'text/plain');
		res.end('error');
	}

	if (p === '/simple') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		fs.readFile(fixture_dir + 'opengraph-basic-response.html').then(function(doc) {
			res.end(doc);
		});
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
