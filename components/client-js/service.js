
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
		global: '/global'
	}
	, home: {
		featured_clubs: '/featured/clubs'
		, featured_posts: '/featured/posts?skip=0&limit=20'
	}
	, help: {}
	, featured_posts: {
		endpoint: '/featured/posts'
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
 * @param   String   name  API name
 * @return  Promise
 */
Service.prototype.sync = function(name) {
	return this.fetch(name);
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

	return fetch(prefix + url, opts);
};

/**
 * Fetch backend in parallel
 *
 * @param   String   name  API name
 * @param   Object   opts  Optional parameters
 * @return  Promise
 */
Service.prototype.fetch = function(name, opts) {
	opts = opts || {};

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

		// send cookie
		// TODO: investigate auth token
		var f = fetch(prefix + endpoint[prop] + queries, {
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
