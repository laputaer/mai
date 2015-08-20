
/**
 * stash-item.js
 *
 * Stash item object validation schema
 */

var LGTM = require('lgtm');
var validator = require('../validator');
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('url')
			.using(function(value) {
				return validator.testUrl(value)
			}, 'url invalid')
		.validates('title')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 128)
			}, 'title invalid')
		.validates('favicon')
			.optional()
			.using(function(value) {
				return validator.testUrl(value)
			}, 'favicon invalid')
		.validates('user')
			.optional()
			.using(function(value) {
				return validator.supported(value)
			}, 'user invalid')
		.validates('name')
			.optional()
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 32)
			}, 'name invalid')
		.validates('pass')
			.optional()
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 32)
			}, 'pass invalid')
		.build();
};
