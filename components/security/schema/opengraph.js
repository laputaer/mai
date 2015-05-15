
/**
 * opengraph.js
 *
 * OpenGraph object validation schema
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
					&& validator.isLength(value, 1, 128)
			}, 'title invalid')
		.validates('url')
			.using(function(value) {
				return validator.supported(value)
					&& validator.isLength(value, 1, 256)
					&& validator.isURL(value, {
						protocols: ['https', 'http']
						, require_protocol: true
					})
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
				return list.every(function(image) {
					if (!image.url && !image.secure_url) {
						return false;
					}

					var value = image.secure_url || image.url;

					return validator.supported(value)
						&& validator.isLength(value, 1, 256)
						&& validator.isURL(value, {
							protocols: ['https', 'http']
							, require_protocol: true
						});
				});
			}, 'image invalid')
		.validates('video')
			.optional()
			.using(function(list) {
				return list.every(function(video) {
					if (!video.url && !video.secure_url) {
						return false;
					}

					var value = video.secure_url || video.url;

					return validator.supported(value)
						&& validator.isLength(value, 1, 256)
						&& validator.isURL(value, {
							protocols: ['https', 'http']
							, require_protocol: true
						});
				});
			}, 'video invalid')
		.validates('audio')
			.optional()
			.using(function(list) {
				return list.every(function(audio) {
					if (!audio.url && !audio.secure_url) {
						return false;
					}

					var value = audio.secure_url || audio.url;

					return validator.supported(value)
						&& validator.isLength(value, 1, 256)
						&& validator.isURL(value, {
							protocols: ['https', 'http']
							, require_protocol: true
						});
				});
			}, 'audio invalid')
		.build();
};
