
/**
 * proxy.js
 *
 * Image proxy object validation schema
 */

var LGTM = require('lgtm');
var hmac = require('crypto').createHmac;
var ruleset = factory();

module.exports = ruleset;

function factory() {
	return LGTM.validator()
		.validates('url')
			.using('url', 'hash', 'key', function(url, hash, key) {
				if (!url || !hash || !key) {
					return false;
				}

				var h = hmac('sha1', key);
				h.update(url);
				var new_hash = h.digest('hex');

				return new_hash === hash;
			}, 'url/hash/key invalid')
		.build();
};
