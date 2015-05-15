
/**
 * post.js
 *
 * Post object validation schema
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
						, require_tld: true
						, require_protocol: true
					})
			}, 'link invalid')
		.build();
};
