
/**
 * service.js
 *
 * Manage backend data sync process
 */

'use strict';

// API prefix
var prefix = '/api/v1';

// API group
var api = require('./api');

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
Service.prototype.init = function() {
	return this.fetch('init');
};

/**
 * Sync page-specific data with backend
 *
 * @param   Object   route  { name, params }
 * @return  Promise
 */
Service.prototype.sync = function(route) {
	return this.fetch(route.name, null, route.params);
};

/**
 * Fetch backend, raw request
 *
 * @param   String   url   Backend service endpoint
 * @param   Object   opts  Optional parameters
 * @return  Promise
 */
Service.prototype.send = function(url, opts) {
	opts = opts || {};

	if (!opts.credentials) {
		opts.credentials = 'same-origin';
	}

	console.log(prefix + url);
	console.log(opts);
	return fetch(prefix + url, opts);
};

/**
 * Fetch backend in parallel
 *
 * @param   String   name    API name
 * @param   Object   opts    Optional parameters
 * @param   Array    params  Params for endpoints
 * @return  Promise
 */
Service.prototype.fetch = function(name, opts, params) {
	opts = opts || {};
	params = params || [];

	var endpoint = api[name];
	var results = {};
	var fetches = [];
	var queries = '';

	// build query string
	for (var query in opts) {
		if (!opts.hasOwnProperty(query)) {
			continue;
		}

		if (!queries) {
			queries += '?' + query + '=' + opts[query];
		} else {
			queries += '&' + query + '=' + opts[query];
		}
	}

	// make request
	for (var prop in endpoint) {
		if (!endpoint.hasOwnProperty(prop)) {
			continue;
		}

		var path = endpoint[prop];
		var count = 0;

		// allow optional route params
		if (params.length > 0) {
			path = path.replace(/:[^\s\$/]+/g, function () {
				return params[count++];
			});
		}

		// send cookie
		// TODO: investigate auth token
		var f = fetch(prefix + path + queries, {
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
		try {
			return res.json();
		} catch(e) {
			// console.debug(e);
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
