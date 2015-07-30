
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
	, myClubs: {
		my_clubs: '/clubs/owner?skip=0&limit=20'
		, joined_clubs: '/clubs/member?skip=0&limit=20'
	}
	, clubProfile: {
		club_profile: '/clubs/:slug/profile'
		, club_posts: '/clubs/:slug/posts?skip=0&limit=20'
	}
	, userProfile: {
		user_profile: '/users/:uid/profile'
		, user_posts: '/users/:uid/posts?skip=0&limit=20'
	}
	, help: {}
	, featured_posts: {
		endpoint: '/featured/posts'
	}
	, my_clubs: {
		endpoint: '/clubs/owner'
	}
	, joined_clubs: {
		endpoint: '/clubs/member'
	}
	, club_posts: {
		endpoint: '/clubs/:slug/posts'
	}
	, user_posts: {
		endpoint: '/users/:uid/posts'
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

	return fetch(prefix + url, opts);
};

/**
 * Fetch backend in parallel
 *
 * @param   String   name    API name or url
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
