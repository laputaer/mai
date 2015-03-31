
/**
 * i18n.js
 *
 * Return polyglot object with translation loaded
 */

var Polyglot = require('node-polyglot');
var i18n = {
	'en-US': require('./en-US')
	, 'zh-CN': require('./zh-CN')
};

module.exports = factory;

/**
 * Build polyglot object
 *
 * @param   String  name  locale
 * @return  Object
 */
function factory(locale) {
	var polyglot = new Polyglot();

	// missing translation
	if (!i18n[locale]) {
		return polyglot;
	}

	polyglot.extend(i18n[locale]);

	// pluralization hint
	if (locale.indexOf('zh') === 0) {
		polyglot.locale('zh');
	} else if (locale.indexOf('en') === 0) {
		polyglot.locale('en');
	}

	return polyglot;
};
