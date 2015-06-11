
/**
 * i18n.js
 *
 * Export an 1i8n object to be used in builders/templates
 */

// load polyglot
var Polyglot = require('node-polyglot');
var polyglot = new Polyglot();

// load translation
polyglot.extend(require('../i18n/en-US'), 'en-us');
polyglot.extend(require('../i18n/zh-CN'), 'zh-cn');

// default locale, disable pluralization support
polyglot.locale('zh');

// i18n abstraction
var Translation = require('../i18n/translation');

// instance for each translation
var i18n = {};
i18n['zh-cn'] = new Translation(polyglot, {
	locale: 'zh-cn'
});
i18n['en-us']= new Translation(polyglot, {
	locale: 'en-us'
});

// export i18n factory
module.exports = factory;

/**
 * Factory
 *
 * @param   String  locale  Locale name
 * @return  Object          I18n object
 */
function factory(locale) {
	if (!locale) {
		return i18n['zh-cn'];
	}

	return i18n[locale];
};
