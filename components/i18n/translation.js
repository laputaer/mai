
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
function Translation(i18n, opts) {
	if (!i18n) {
		throw new Error('translator missing');
	}

	opts = opts || {};

	this.i18n = i18n;
	this.prefix = opts.locale || 'zh-cn';
}

/**
 * Get or set locale
 *
 * @param   String  name  Locale name  
 * @return  String        Current locale
 */
Translation.prototype.locale = function(name) {
	if (!name) {
		return this.prefix;
	}

	this.prefix = name;
	return this.prefix;
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
