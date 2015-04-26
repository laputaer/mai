
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
			.using(function(value) {
				return validator.isLength(value, 2, 128)
					&& validator.supported(value)
			}, 'q invalid')
		.build();
};
