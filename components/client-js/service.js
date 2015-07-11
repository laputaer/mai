
/**
 * service.js
 *
 * Manage backend data sync process
 */

'use strict';

// API prefix
var prefix = '/api/v1';

// API group
var api = {
	init: {
		user: '/user'
		, global: '/global'
	}
	, home: {}
	, help: {}
};

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
 * Initialize global data
 *
 * @return  Promise
 */
Service.prototype.init = function() {
	return this.fetch('init');
};

/**
 * Fetch backend in parallel
 *
 * @param   String   name  API name
 * @return  Promise
 */
Service.prototype.fetch = function(name) {
	var endpoint = api[name];
	var results = {};
	var fetches = [];

	for (var prop in endpoint) {
		if (!endpoint.hasOwnProperty(prop)) {
			continue;
		}

		// send cookie
		// TODO: investigate auth token
		var f = fetch(prefix + endpoint[prop], {
			credentials: 'same-origin'
		});

		// allow us to resolve fetch into an object
		deferFetch(fetches, f, results, prop);
	}

	return Promise.all(fetches).then(function() {
		return results;
	});
};

/**
 * Defer fetch and allow us to collect data as object
 *
 * @param   Array    ps       List of promises
 * @param   Promise  p        Fetch promise
 * @param   Object   results  Object output
 * @param   String   name     Object attribute name
 * @return  Void
 */
function deferFetch(ps, p, results, name) {
	results[name] = null;

	// TODO: better error handling
	ps.push(p.then(function(res) {
		// non-2xx response
		if (!res.ok) {
			results[name] = null;
			return null;
		}
		return res.json();
	}).then(function(json) {
		// invalid json
		if (!json) {
			results[name] = null;
			return null;
		}
		results[name] = json;
	}));
};
