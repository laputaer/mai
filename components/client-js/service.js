
/**
 * service.js
 *
 * Manage backend data sync process
 */

'use strict';

// helpers
var extend = require('xtend');

// API group
var api = require('./api');
var prefix = api.prefix;
var default_qs = api.default_qs;

module.exports = Service;

/**
 * Service class
 *
 * @return  Void
 */
function Service() {
	if (!(this instanceof Service)) {
		return new Service();
	}
}

/**
 * Initialize global data with backend
 *
 * @return  Promise
 */
Service.prototype.init = function () {
	return this.multiFetch('init');
};

/**
 * Sync page-specific data with backend
 *
 * @param   Object   route  { name, params }
 * @return  Promise
 */
Service.prototype.sync = function (route) {
	return this.multiFetch(route.name, route.params);
};

/**
 * Raw request builder
 *
 * @param   String   name    API name
 * @param   Object   params  Params for endpoints
 * @param   Object   opts    Fetch options
 * @return  Promise
 */
Service.prototype.send = function (name, params, opts) {
	params = params || {};
	opts = opts || {};

	// path builder
	var path = api[name];

	if (typeof path === 'object') {
		params = extend(default_qs, params);
		path = path.build(params);
	}

	// fetch builder
	if (!opts.credentials) {
		opts.credentials = 'same-origin';
	}

	return fetch(prefix + path, opts);
};

/**
 * Fetch multiple backend in parallel
 *
 * @param   String   name    API name
 * @param   Object   params  Params for endpoints
 * @return  Promise
 */
Service.prototype.multiFetch = function (name, params) {
	params = params || {};

	var group = api[name];
	var fetches = [];
	var results = {};

	// request builder
	for (var prop in group) {
		if (!group.hasOwnProperty(prop)) {
			continue;
		}

		// path builder
		var path = group[prop];

		if (typeof path === 'object') {
			params = extend(default_qs, params);
			path = path.build(params);
		}

		// fetch builder
		var opts = {
			credentials: 'same-origin'
		};

		var f = fetch(prefix + path, opts);

		// allow us to resolve all fetches into an object
		deferFetch(fetches, results, f, prop);
	}

	// result will be an object of all json responses
	return Promise.all(fetches).then(function() {
		return results;
	});
};

/**
 * Defer fetch and allow us to collect data as object
 *
 * @param   Array    ps       List of promises
 * @param   Object   results  Final output
 * @param   Promise  p        Fetch promise
 * @param   String   name     Output attribute name
 * @return  Void
 */
function deferFetch (ps, results, p, name) {
	results[name] = null;

	ps.push(p.then(function(res) {
		try {
			return res.json();
		} catch(e) {
			//console.debug(e);
		}
		return null;
	}).then(function(json) {
		if (!json) {
			results[name] = null;
			return;
		}
		results[name] = json;
	}));
};
