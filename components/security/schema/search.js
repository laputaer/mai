
/**
 * search.js
 *
 * Search query object validation schema
 */

var LGTM = require('lgtm');
var validator = require('../validator');
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('q')
			.optional()
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 2, 64)
			}, 'q invalid')
		.build();
};
