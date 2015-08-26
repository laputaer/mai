
/**
 * app-name.js
 *
 * App name object validation schema
 */

var LGTM = require('lgtm');
var validator = require('../validator');
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('name')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 2, 16)
					&& validator.matches(value, '^[a-z0-9-]+$')
					&& value.indexOf('--') === -1
					&& value.substr(0, 1) !== '-'
					&& value.substr(-1) !== '-'
			}, 'name invalid')
		.build();
};
