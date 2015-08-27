
/**
 * query.js
 *
 * Query object validation schema
 */

var LGTM = require('lgtm');
var validator = require('../validator');
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('limit')
			.optional()
			.using(function(value) {
				if (!validator.supported(value)) {
					return false
				}

				var num = validator.toInt(value);

				if (isNaN(num) || num < 1 || num > 20) {
					return false
				}

				return true;
			}, 'limit invalid')
		.validates('skip')
			.optional()
			.using(function(value) {
				if (!validator.supported(value)) {
					return false
				}

				var num = validator.toInt(value);

				if (isNaN(num) || num < 0 || num > 500) {
					return false
				}

				return true;
			}, 'skip invalid')
		.validates('range')
			.optional()
			.using(function(value) {
				if (!validator.supported(value)) {
					return false
				}

				var num = validator.toInt(value);

				if (isNaN(num) || num < 0 || num > Date.now()) {
					return false
				}

				return true;
			}, 'range invalid')
		.validates('stash')
			.optional()
			.using(function(value) {
				return validator.supported(value)
			}, 'stash invalid')
		.build();
};
