
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
				return validator.supported(value)
					&& validator.isLength(value, 1, 64)
					&& validator.isAlphanumeric(value)
			}, 'id invalid')
		.validates('name')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 64)
			}, 'name invalid')
		.validates('login')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 32)
					&& validator.matches(value, '^[a-z0-9-_]+$')
			}, 'login invalid')
		.validates('avatar')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 256)
					&& validator.isURL(value)
			}, 'avatar invalid')
		.validates('access_token')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 256)
			}, 'token invalid')
		.validates('access_secret')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 256)
			}, 'secret invalid')
		.build();
};
