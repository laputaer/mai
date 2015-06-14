
/**
 * model.js
 *
 * Manage client-side data store
 */

'use strict';

var I = require('icepick');

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
 * @param   Object  data  Global data
 * @return  Void
 */
Model.prototype.init = function(data) {
	for (var prop in data) {
		if (!data.hasOwnProperty(prop)) {
			continue;
		}

		if (data[prop].code !== 200) {
			continue;
		}

		this.store = I.assoc(this.store, prop, data[prop].data);
	}
};

/**
 * Get a subpath of our store
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
