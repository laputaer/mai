
/**
 * model.js
 *
 * Provide a centralized model, using immutable data
 */

'use strict';

// immutable data structure
var Immutable = require('immutable');

module.exports = Model;

/**
 * Hold immutable data and provide basic API for backend sync
 *
 * @return  Void
 */
function Model() {
	if (!(this instanceof Model)) {
		return new Model();
	}

	// global configuration
	this.config = {};

	// global data instance
	this.data = {};
}
