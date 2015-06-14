
/**
 * model.js
 *
 * Manage client-side data store
 */

'use strict';

// client-side api
var win = window;
var doc = document;

// immutable object
var I = require('icepick');

// helpers
var removeTrailingSlash = require('../helpers/remove-trailing-slash');

module.exports = Model;

/**
 * Model class
 *
 * @return  Void
 */
function Model() {
	if (!(this instanceof Model)) {
		return new Model();
	}

	this.store = I.freeze({});
}

/**
 * Initialize store
 *
 * @param   Object  data  JSON data
 * @return  Void
 */
Model.prototype.init = function(data) {
	this.set('client', true);
	this.set('locale', data.global.data.locale);
	this.set('version', data.global.data.version);
	this.set('base_url', data.global.data.base_url);
	this.set('production', data.global.data.production);
	this.set('current_user', data.user.data);
	this.set('current_path', removeTrailingSlash(win.location.pathname));
	this.set('current_url', win.location.href);
	var crsf_meta = doc.head.querySelector('meta[name="mai:token"]');
	if (crsf_meta) {
		this.set(['current_user', 'csrf_token'], crsf_meta.content);
	}
};

/**
 * Initialize store
 *
 * @param   Object  data  JSON data
 * @return  Void
 */
Model.prototype.sync = function(data) {
	for (var prop in data) {
		if (!data.hasOwnProperty(prop)) {
			continue;
		}

		if (data[prop].code !== 200) {
			continue;
		}

		this.set(prop, data[prop].data);
	}
};

/**
 * Set a subpath of internal store
 *
 * @param   Mixed   path  Store key path
 * @param   Mixed   data  New data
 * @return  Object        Immutable object
 */
Model.prototype.set = function(path, data) {
	if (typeof path === 'string') {
		this.store = I.assoc(this.store, path, data);
		return this.store;
	} else if (typeof path === 'object') {
		this.store = I.assocIn(this.store, path, data);
		return this.store;
	}

	throw new Error('invalid path');
};

/**
 * Get a subpath of internal store
 *
 * @param   Mixed   path  Store key path
 * @return  Object        Immutable object
 */
Model.prototype.get = function(path) {
	if (!path) {
		return this.store;
	} else if (typeof path === 'string') {
		return this.store[path];
	} else if (typeof path === 'object') {
		return I.getIn(this.store, path);
	}

	throw new Error('invalid path');
};
