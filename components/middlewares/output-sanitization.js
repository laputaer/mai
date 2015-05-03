
/**
 * output-sanitization.js
 *
 * Global output filters
 */

var xss = require('xss-filters');
var filters = {
	data: xss.inHTMLData
	, attr: xss.inDoubleQuotedAttr
	, url: xss.uriInDoubleQuotedAttr
	, path: xss.uriPathInDoubleQuotedAttr
	, encode: xss.uriComponentInDoubleQuotedAttr
};

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @param   Boolean  flag  Return config object or middleware
 * @return  Mixed
 */
function factory(flag) {
	if (!flag) {
		return filters;
	}

	return middleware;
};

/**
 * Koa middleware
 *
 * @param   Function  next  Flow control
 * @return  Void
 */
function *middleware(next) {
	this.xss = filters;
	yield next;
};
