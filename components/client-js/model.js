
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
var getVarType = require('../helpers/get-variable-type');

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
	// this is similar to builders/prepare-data but for client-side
	this.set('client', true);
	this.set('locale', data.global.data.locale);
	this.set('version', data.global.data.version);
	this.set('base_url', data.global.data.base_url);
	this.set('current_path', removeTrailingSlash(win.location.pathname));
	this.set('current_url', win.location.href);
	this.set('ui', {});

	// handle guest user
	if (!data.global.data.current_user) {
		return;
	}

	// login user
	this.set('current_user', data.global.data.current_user);

	// retrieve crsf token from meta
	var crsf_meta = doc.head.querySelector('meta[name="mai:token"]');
	if (crsf_meta) {
		this.set(['current_user', 'csrf_token'], crsf_meta.content);
	}
};

/**
 * Update store
 *
 * @param   Object  data  JSON data
 * @return  Void
 */
Model.prototype.update = function(data) {
	// copy json response data onto store
	for (var prop in data) {
		if (!data.hasOwnProperty(prop)) {
			continue;
		}

		if (!data[prop].ok) {
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
	// see icepick doc for details
	if (getVarType(path) === 'String') {
		this.store = I.assoc(this.store, path, data);
		return this.store;
	} else if (getVarType(path) === 'Array') {
		this.store = I.assocIn(this.store, path, data);
		return this.store;
	}

	throw new Error('set: invalid path');
};

/**
 * Get a subpath of internal store
 *
 * @param   Mixed   path  Store key path
 * @return  Object        Immutable object
 */
Model.prototype.get = function(path) {
	// see icepick doc for details
	if (!path) {
		return this.store;
	} else if (getVarType(path) === 'String') {
		return this.store[path];
	} else if (getVarType(path) === 'Array') {
		return I.getIn(this.store, path);
	}

	throw new Error('get: invalid path');
};

/**
 * Append item onto an array in store, prevent duplicate
 *
 * @param   Mixed   path  Store key path
 * @param   Mixed   data  New data
 * @param   String  key   Key name for duplicate detection
 * @return  Object        Immutable object
 */
Model.prototype.append = function(path, data, key) {
	// make existing data array
	var arr;
	if (getVarType(path) === 'String') {
		arr = this.store[path];
	} else if (getVarType(path) === 'Array') {
		arr = I.getIn(this.store, path);
	} else {
		throw new Error('append: invalid path');
	}

	if (!Array.isArray(arr)) {
		throw new Error('append: data on path is not an array');
	}

	// find duplicate
	var pos;
	if (key) {
		arr.some(function (item, i) {
			if (item.hasOwnProperty(key)
				&& data.hasOwnProperty(key)
				&& item[key] === data[key])
			{
				pos = i;
				return true;
			}
			return false;
		});
	}

	// append value or update existing value
	if (pos === undefined) {
		this.set(path, I.push(arr, data));
	} else {
		var new_path = typeof path === 'string' ? [path, pos] : path.concat(pos);
		this.set(new_path, data);
	}
};
