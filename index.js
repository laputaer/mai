
/**
 * index.js
 *
 * App entry point, kickstart server
 */

var app = require('./app');
var configFactory = require('./components/config/config');
var config = configFactory();

// for local development
if (config.server.key && config.server.crt) {
	var http = require('http');
	var https = require('https');
	var fs = require('fs');
	var options = {
		key: fs.readFileSync(config.server.key)
		, cert: fs.readFileSync(config.server.crt)
	};

	if (app.env === 'dev') {
		http.createServer(app.callback()).listen(config.server.port);
	} else if (app.env === 'local') {
		https.createServer(options, app.callback()).listen(443);
	} else {
		app.listen(config.server.port);
	}
	return;
}

// for production
app.listen(config.server.port);
