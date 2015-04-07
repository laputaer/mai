
/**
 * club.js
 *
 * Koa route handler for club page
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
	data.body = [];

	// guest user
	if (!data.current_user) {
		data.body.push(builders.login(data));

	// login user
	} else {
		data.user = yield findUser.apply(this);
		data.body.push(builders.club(data));
	}

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
