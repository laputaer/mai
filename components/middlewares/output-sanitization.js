
/**
 * output-sanitization.js
 *
 * Global output filters
 */

var xss = require('xss-filters');
var filters = {
	data: function(input) {
		return xss.inHTMLData(input);
	}
	, attr: function(input) {
		return xss.inDoubleQuotedAttr(input);
	}
	, url: function(input) {
		return xss.uriInDoubleQuotedAttr(decodeURI(input));
	}
	, path: function(input) {
		return xss.uriPathInDoubleQuotedAttr(input);
	}
	, encode: function(input) {
		return xss.uriComponentInDoubleQuotedAttr(input);
	}
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
