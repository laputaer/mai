
/**
 * club-new.js
 *
 * Koa route handler for new club creation page
 */

var builders = require('../builders/builders');
var removeSlash = require('../helpers/remove-trailing-slash');
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
	data.path = removeSlash(this.path);
	data.version = this.config.version;
	data.current_user = this.state.user;
	data.body = [];

	// guest user
	if (!data.current_user) {
		data.body.push(builders.login(data));

	// login user
	} else {
		data.user = yield findUser.apply(this);
		data.body.push(builders.clubNew(data));
	}

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
