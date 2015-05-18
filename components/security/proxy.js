
/**
 * proxy.js
 *
 * Create an image url that use proxy to fetch remote resource
 */

var hmac = require('./hmac');
var encode = require('xss-filters').uriComponentInDoubleQuotedAttr;

module.exports = proxy;

/**
 * Image url generator
 *
 * @param   String  url   Full url
 * @param   String  key   Secret key
 * @param   String  size  Image size
 * @return  String        Proxy url
 */
function proxy(url, key, size) {
	var hash = hmac(url, key);
	return '/ip/' + hash + '/?url=' + encode(url) + '&size=' + size;
};
