
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
		.validates('password')
			.using(function(value) {
				if (!validator.supported(value)) {
					return false;
				}

				if (value.indexOf(':') === -1) {
					return false;
				}

				var pass = value.split(':');
				if (pass.length !== 2) {
					return false;
				}

				return true;
			}, 'password invalid')
		.build();
};
