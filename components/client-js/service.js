
/**
 * service.js
 *
 * Manage backend data sync process
 */

'use strict';

var prefix = '/api/v1';

var api = {
	init: {
		user: '/user'
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
 * @return  Promise
 */
Service.prototype.sync = function() {

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

		// TODO: better error handling
		fetches.push(fetch(prefix + endpoint[prop]).then(function(res) {
			if (!res.ok) {
				results[prop] = null;
				return;
			}
			return res.json();
		}).then(function(json) {
			if (!json) {
				return;
			}
			results[prop] = json;
		}));
	}

	return Promise.all(fetches).then(function() {
		return results;
	});
};
