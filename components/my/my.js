
/**
 * my.js
 *
 * Koa route handler for user home
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

	var user = yield findUser.apply(this);

	// prepare data
	var data = {};
	data.i18n = this.i18n;
	data.version = this.config.version;
	data.body = [];

	if (!user) {
		data.body.push(builders.login(data));
	} else {
		data.body.push(builders.my(data));
	}

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
