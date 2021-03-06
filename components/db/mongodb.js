
/**
 * mongodb.js
 *
 * A simple wrapper for mongodb driver
 */

var mongo = require('yieldb').connect;
var hasAttrs = require('../helpers/has-required-attributes');
var db;

module.exports = database;

/**
 * Return an instance of yieldb
 *
 * @param   Object   opts  Mongodb config
 * @return  MongoDB
 */
function *database(opts) {
	if (db) {
		return db;
	}

	if (!hasAttrs(opts, ['server', 'port', 'database', 'w'])) {
		throw new Error('Missing required mongodb config');
	}

	// build server string
	var url = 'mongodb://';
	
	if (opts.user && opts.pass) {
		url += opts.user + ':' + opts.pass + '@';
	}

	// basic connection url
	url += opts.server + ':' + opts.port
		+ '/' + opts.database + '?w=' + opts.w;

	if (opts.replSet) {
		url += '&replicaSet=' + opts.replSet;
	}

	if (opts.userdb) {
		url += '&authSource=' + opts.userdb;
	}

	// make sure we have active connection to mongodb
	db = yield mongo(url);

	return db;
};
