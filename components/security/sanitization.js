
/**
 * sanitization.js
 *
 * A helper function for data output sanitization
 */

var xss = require('xss-filters');

module.exports = {
	data: xss.inHTMLData
	, attr: xss.inDoubleQuotedAttr
	, url: xss.uriInDoubleQuotedAttr
	, path: xss.uriPathInDoubleQuotedAttr
	, encode: xss.uriComponentInDoubleQuotedAttr
};
