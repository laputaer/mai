
/**
 * start-up.js
 *
 * Startup server according to environment settings
 */

var http = require('http');
var https = require('https');
var fs = require('fs');

module.exports = startUp;

/**
 * Startup server properly given environment variable
 *
 * @param   Object  app     Koa instance
 * @param   Object  config  Global configuration
 * @return  Void
 */
function startUp(app, config) {
	// no ssl settings, assume production mode
	if (!config.server.key || !config.server.crt) {
		app.listen(config.server.port);
		return;
	}

	// explicit production environment
	if (app.env === 'production') {
		app.listen(config.server.port);
		return;
	}

	// ssl settings found, unknown environment, assume iojs is serving ssl directly
	var options = {
		key: fs.readFileSync(config.server.key)
		, cert: fs.readFileSync(config.server.crt)
	};

	// run http and https servers, require root permission on OSX
	if (app.env === 'development' || app.env === 'local') {
		http.createServer(app.callback()).listen(config.server.port);
		https.createServer(options, app.callback()).listen(443);
		return;
	}

	// unexpected setup
	throw new Error('unknown environment: ' + app.env);
};
