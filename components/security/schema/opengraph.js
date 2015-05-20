
/**
 * opengraph.js
 *
 * OpenGraph object validation schema
 */

var LGTM = require('lgtm');
var mime = require('mime-types');
var validator = require('../validator');
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('title')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 128)
			}, 'title invalid')
		.validates('url')
			.using(function(value) {
				return validator.testUrl(value)
			}, 'url invalid')
		.validates('site_name')
			.optional()
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 64)
			}, 'site_name invalid')
		.validates('type')
			.optional()
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 32)
			}, 'type invalid')
		.validates('description')
			.optional()
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 1024)
			}, 'description invalid')
		.validates('image')
			.optional()
			.using(function(list) {
				return list.every(function(item) {
					if (item.url && !validator.testUrl(item.url)) {
						return false;
					}

					if (item.secure_url && !validator.testUrl(item.secure_url)) {
						return false;
					}

					if (item.width && !validator.isInt(item.width)) {
						return false;
					}

					if (item.height && !validator.isInt(item.height)) {
						return false;
					}

					// TODO: until mime.lookup supports full content-type
					if (item.type && !mime.extension(item.type)) {
						return false;
					}

					return true;
				});
			}, 'image invalid')
		.validates('video')
			.optional()
			.using(function(list) {
				return list.every(function(item) {
					if (item.url && !validator.testUrl(item.url)) {
						return false;
					}

					if (item.secure_url && !validator.testUrl(item.secure_url)) {
						return false;
					}

					if (item.width && !validator.isInt(item.width)) {
						return false;
					}

					if (item.height && !validator.isInt(item.height)) {
						return false;
					}

					if (item.type && !mime.extension(item.type)) {
						return false;
					}

					return true;
				});
			}, 'video invalid')
		.validates('audio')
			.optional()
			.using(function(list) {
				return list.every(function(item) {
					if (item.url && !validator.testUrl(item.url)) {
						return false;
					}

					if (item.secure_url && !validator.testUrl(item.secure_url)) {
						return false;
					}

					if (item.type && !mime.extension(item.type)) {
						return false;
					}

					return true;
				});
			}, 'audio invalid')
		.build();
};
