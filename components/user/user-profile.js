
/**
 * user-profile.js
 *
 * Koa route handler for full user profile
 */

var builders = require('../builders/builders');

var findUser = require('./find-user');

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

	// prepare data
	var data = {};
	data.i18n = this.i18n;
	data.version = this.config.version;
	data.current_user = this.state.user;
	data.user = yield findUser.apply(this);
	data.body = [];

	if (!data.user) {
		data.message = data.i18n.t('error.not-found-user');
		data.body.push(builders.notFoundError(data));
	} else {
		data.body.push(builders.userProfile(data));
	}

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
