
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
				if (!validator.supported(value)) {
					return false;
				}

				if (value.indexOf(':') === -1) {
					return false;
				}

				var token = value.split(':');
				if (token.length !== 3) {
					return false;
				}

				return true;
			}, 'token invalid')
		.build();
};
