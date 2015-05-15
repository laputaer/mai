
/**
 * oembed-image.js
 *
 * Image profile oembed object validation schema
 */

var LGTM = require('lgtm');
var validator = require('../validator');
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('image')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 256)
					&& validator.isURL(value, {
						protocols: ['https', 'http']
						, require_protocol: true
					})
			}, 'image invalid')
		.validates('author')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 64)
			}, 'author invalid')
		.validates('source')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 256)
					&& validator.isURL(value, {
						protocols: ['https', 'http']
						, require_protocol: true
					})
			}, 'source invalid')
		.validates('license')
			.optional()
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 256)
					&& validator.isURL(value, {
						protocols: ['https', 'http']
						, require_protocol: true
					})
			}, 'license invalid')
		.validates('license_name')
			.optional()
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 32)
			}, 'license_name invalid')
		.validates('provider')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 32)
			}, 'provider invalid')
		.validates('domain')
			.optional()
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 256)
					&& validator.isURL(value, {
						protocols: ['https', 'http']
						, require_protocol: true
					})
			}, 'domain invalid')
		.build();
};
