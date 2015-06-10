
/**
 * model.js
 *
 * Provide a centralized model, using immutable data
 */

'use strict';

// client-side only api
var win = window;
var doc = document;
var fetch = win.fetch;

// immutable data structure
var I = require('icepick');

// helpers
var removeSlash = require('../helpers/remove-trailing-slash');

module.exports = Model;

/**
 * Hold immutable data and provide basic API for backend sync
 *
 * @param   Object  opts  Client data
 * @return  Void
 */
function Model(opts) {
	if (!(this instanceof Model)) {
		return new Model(opts);
	}

	// TODO: take real input
	this.store = I.freeze({
		version: {
			css: 'v1.0.18'
			, js: 'v1.0.18'
			, asset: 'v1.0.18'
		}
		, base_url: 'https://mai.dev'
	});
}

/**
 * Sync with backend to get server data
 *
 * @return  Promise
 */
Model.prototype.sync = function() {
	var api = '/api' + removeSlash(win.location.pathname);

	if (win.location.search) {
		api += win.location.search;
	}

	return fetch(api).then(function(res) {
		if (!res.ok) {
			console.log(res.status);
			return;
		}

		return res.json()
	}).then(function(json) {
		// TODO: add to immutable store
		console.log(json);
	}).catch(function(err) {
		// TODO: just in case
		console.log(err);
	});
};
