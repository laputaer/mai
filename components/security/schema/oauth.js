
/**
 * oauth.js
 *
 * OAuth profile object validation schema
 */

var LGTM = require('lgtm');
var validator = require('../validator');
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('id')
			.using(function(value) {
				return validator.isLength(value, 1, 64)
					&& validator.supported(value)
					&& validator.isAlphanumeric(value)
			}, 'id invalid')
		.validates('name')
			.using(function(value) {
				return validator.isLength(value, 1, 64)
					&& validator.supported(value)
			}, 'name invalid')
		.validates('login')
			.using(function(value) {
				return validator.isLength(value, 1, 32)
					&& validator.supported(value)
					&& validator.matches(value, '^[a-z0-9-_]+$')
			}, 'login invalid')
		.validates('avatar')
			.using(function(value) {
				return validator.isLength(value, 1, 256)
					&& validator.supported(value)
					&& validator.isURL(value)
			}, 'avatar invalid')
		.build();
};
