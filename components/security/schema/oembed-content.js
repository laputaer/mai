
/**
 * oembed-content.js
 *
 * Content profile oembed object validation schema
 */

var LGTM = require('lgtm');
var validator = require('../validator');
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('content')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 1024)
			}, 'content invalid')
		.validates('author')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 64)
			}, 'author invalid')
		.validates('profile')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 256)
					&& validator.isURL(value, {
						protocols: ['https', 'http']
						, require_protocol: true
					})
			}, 'profile invalid')
		.validates('source')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 256)
					&& validator.isURL(value, {
						protocols: ['https', 'http']
						, require_protocol: true
					})
			}, 'source invalid')
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
