
/**
 * domains-server.js
 *
 * A test server for domains test
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
		console.error(err.stack);
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

	if (p === '/basic') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		fs.readFile(fixture_dir + 'opengraph-basic-response.html').then(function(doc) {
			res.end(doc);
		});
	}

	if (p === '/case-1') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		fs.readFile(fixture_dir + 'opengraph-real-world-case-1.html').then(function(doc) {
			res.end(doc);
		});
	}

	if (p === '/case-2') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		fs.readFile(fixture_dir + 'opengraph-real-world-case-2.html').then(function(doc) {
			res.end(doc);
		});
	}

	if (p === '/case-3') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		fs.readFile(fixture_dir + 'opengraph-real-world-case-3.html').then(function(doc) {
			res.end(doc);
		});
	}

	if (p === '/case-4') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		fs.readFile(fixture_dir + 'opengraph-real-world-case-4.html').then(function(doc) {
			res.end(doc);
		});
	}

	if (p === '/case-5') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		fs.readFile(fixture_dir + 'opengraph-real-world-case-5.html').then(function(doc) {
			res.end(doc);
		});
	}

	if (p === '/case-6') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		fs.readFile(fixture_dir + 'opengraph-real-world-case-6.html').then(function(doc) {
			res.end(doc);
		});
	}

	if (p === '/edge-1') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		fs.readFile(fixture_dir + 'opengraph-edge-case-1.html').then(function(doc) {
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
