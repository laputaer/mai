
/**
 * translation.js
 *
 * Translation object
 */

module.exports = Translation;

/**
 * Translation object, simplify language loading
 *
 * @param   Object  i18n  Translator
 * @param   Object  opts  Configuration
 * @return  Void
 */
function Translation(i18n) {
	if (!i18n) {
		throw new Error('translator missing');
	}

	this.i18n = i18n;
	this.prefix = '';
}

/**
 * Set locale
 *
 * @param   String  locale  
 * @return  Void
 */
Translation.prototype.locale = function(name) {
	this.prefix = name || 'zh-cn';

	if (this.prefix.indexOf('zh') === 0) {
		this.i18n.locale('zh');
	} else if (this.prefix.indexOf('en') === 0) {
		this.i18n.locale('en');
	}
};

/**
 * Translate string
 *
 * @param   String  key      Translation name
 * @param   Object  options  Data and default translation
 * @return  String
 */
Translation.prototype.t = function(name, data) {
	return this.i18n.t(this.prefix + '.' + name, data);
};
