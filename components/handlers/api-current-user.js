
/**
 * api-current-user.js
 *
 * API for getting current user profile
 */

var normalize = require('../security/normalization');
var getStandardJson = require('../helpers/get-standard-json');
var i18n = require('../templates/i18n')();

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
	yield next;

	if (!this.session.uid) {
		this.state.json = getStandardJson(null, 400, i18n.t('error.login-required'));
		return;
	}

	// STEP 1: get user
	var user = normalize(this.state.user, 'outputUser');

	// STEP 2: output json
	this.state.json = getStandardJson(user);
};