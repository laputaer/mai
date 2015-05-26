
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
 * @param   Object  input  { url, key, size, base }
 * @return  String         Proxy url
 */
function proxy(input) {
	if (!input.url || !input.key) {
		throw new Error('origin url and hmac key must be specified');
	}

	var output = '';
	var hash = hmac(input.url, input.key);

	if (input.base) {
		output += input.base;
	}

	output += '/ip/' + hash + '/?url=' + encode(input.url);

	if (input.size) {
		output += '&size=' + input.size;
	}

	return output;
};
