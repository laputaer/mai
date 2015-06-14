
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
	, home: {
		posts: '/posts'
	}
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
 * Sync data on update
 *
 * @param   String   name  API group name
 * @return  Promise
 */
Service.prototype.sync = function(name) {
	return this.fetch(name);
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

		deferFetch(fetches, fetch(prefix + endpoint[prop]), results, prop);
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
		if (!res.ok) {
			results[name] = null;
			return;
		}
		return res.json();
	}).then(function(json) {
		if (!json) {
			results[name] = null;
			return;
		}
		results[name] = json;
	}));
}
