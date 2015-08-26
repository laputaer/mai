
/**
 * app-token.js
 *
 * App token object validation schema
 */

var LGTM = require('lgtm');
var validator = require('../validator');
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('token')
			.using(function(value) {
				return validator.supported(value)
			}, 'token invalid')
		.build();
};
