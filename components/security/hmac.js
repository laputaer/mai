
/**
 * hmac.js
 *
 * Create hmac from url and key
 */

var createHmac = require('crypto').createHmac;

module.exports = hmac;

/**
 * Hmac generator
 *
 * @param   String  url  Full url
 * @param   String  key  Secret key
 * @return  String       HMAC
 */
function hmac(url, key) {
	var h = createHmac('sha1', key);
	h.update(url);
	return h.digest('hex');
};
