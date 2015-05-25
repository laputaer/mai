
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
 * @param   String  base  Base url
 * @return  String        Proxy url
 */
function proxy(url, key, size, base) {
	var hash = hmac(url, key);

	return base + '/ip/' + hash + '/?url=' + encode(url) + '&size=' + size;
};
