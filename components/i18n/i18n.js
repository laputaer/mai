
/**
 * i18n.js
 *
 * Return polyglot object with translation loaded
 */

var Polyglot = require('node-polyglot');
var polyglot = new Polyglot();

var validLocale = ['en-us', 'zh-cn'];

polyglot.extend(require('./en-US'), 'en-us');
polyglot.extend(require('./zh-CN'), 'zh-cn');

var Translation = require('./translation');
var i18n = new Translation(polyglot);

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @param   Boolean  flag  Return i18n object or middleware
 * @return  Mixed
 */
function factory(flag) {
	if (!flag) {
		return i18n;
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
	// in case we need any subdomain-based i18n
	var prefix = 'zh-cn';
	var subdomains = this.subdomains;

	if (subdomains.length > 0 && validLocale.indexOf(subdomains[0]) > -1) {
		prefix = subdomains[0];
	}

	// pass our translation object
	i18n.locale(prefix);
	this.i18n = i18n;

	yield next;
};
