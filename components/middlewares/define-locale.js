
/**
 * define-locale.js
 *
 * Set locale data
 */

var validLocale = ['en-us', 'zh-cn'];

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @return  MW
 */
function factory() {
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
	var locale = 'zh-cn';
	var subdomains = this.subdomains;

	if (subdomains.length > 0 && validLocale.indexOf(subdomains[0]) > -1) {
		locale = subdomains[0];
	}

	this.locale = locale;
	yield next;
};
