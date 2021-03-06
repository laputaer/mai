
/**
 * proxy.js
 *
 * Image proxy object validation schema
 */

var LGTM = require('lgtm');
var hmac = require('../hmac');
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('url')
			.using('url', 'hash', 'key', function(url, hash, key) {
				if (!url || !hash || !key) {
					return false
				}

				if (url.length > 1024 || hash.length > 1024) {
					return false
				}

				return hmac(url, key) === hash
			}, 'url invalid')
		.validates('size')
			.using('size', 'sizes', function(size, sizes) {
				return sizes.hasOwnProperty(size)
			}, 'size invalid')
		.build();
};
