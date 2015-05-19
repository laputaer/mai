
/**
 * post-start.js
 *
 * Post start object validation schema
 */

var LGTM = require('lgtm');
var validator = require('../validator');
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('link')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 256)
					&& validator.isURL(value, {
						protocols: ['https', 'http']
						, require_protocol: true
						, host_blacklist: ['localhost', '127.0.0.1']
					})
			}, 'link invalid')
		.build();
};
