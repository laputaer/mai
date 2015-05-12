
/**
 * club.js
 *
 * Club object validation schema
 */

var LGTM = require('lgtm');
var validator = require('../validator');
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('title')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 2, 16)
			}, 'title invalid')
		.validates('slug')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 2, 16)
					&& validator.matches(value, '^[a-z0-9-]+$')
					&& value.indexOf('--') === -1
					&& value.substr(0, 1) !== '-'
					&& value.substr(-1) !== '-'
			}, 'slug invalid')
		.validates('intro')
			.optional()
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 2, 32)
			}, 'intro invalid')
		.validates('logo')
			.optional()
			.using(function(value) {
				return validator.supported(value)
					&& validator.isURL(value, {
						protocols: ['https', 'http']
						, require_tld: true
						, require_protocol: true
						, host_whitelist: ['www.flickr.com', 'flickr.com', 'flic.kr']
					})
			}, 'logo invalid')
		.build();
};
