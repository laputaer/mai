
/**
 * redirect.js
 *
 * Redirect object validation schema
 */

var LGTM = require('lgtm');
var validator = require('../validator');
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('section')
			.using(function(value) {
				return value === 'c'
					|| value === 'u'
			}, 'slug invalid')
		.validates('id')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 64)
					&& validator.matches(value, '^[a-z0-9-_]+$')
			}, 'slug invalid')
		.build();
};
