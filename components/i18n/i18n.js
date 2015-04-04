
/**
 * i18n.js
 *
 * Return polyglot object with translation loaded
 */

var Polyglot = require('node-polyglot');
var translations = {
	'en-US': require('./en-US')
	, 'zh-CN': require('./zh-CN')
};

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @param   Boolean  flag  Return config or set it
 * @return  Mixed
 */
function factory(flag) {
	if (!flag) {
		return config;
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
	// TODO: use subdomain to select i18n locale
	this.i18n = i18n('zh-CN');
	yield next;
};

/**
 * Create translation instance
 *
 * @param   String  name  locale
 * @return  Object
 */
function i18n(locale) {
	var polyglot = new Polyglot();

	// missing translation
	if (!translations[locale]) {
		return polyglot;
	}

	polyglot.extend(translations[locale]);

	// pluralization hint
	if (locale.indexOf('zh') === 0) {
		polyglot.locale('zh');
	} else if (locale.indexOf('en') === 0) {
		polyglot.locale('en');
	}

	return polyglot;
};
