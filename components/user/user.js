
/**
 * user.js
 *
 * Koa route handler for user login
 */

var removeSlash = require('../helpers/remove-trailing-slash');

var getUserProfile = require('./get-user-profile');
var matchUser = require('./match-user');
var createUser = require('./create-user');
var loginUser = require('./login-user');

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

	this.user = {};
	this.user.oauth = yield getUserProfile.apply(this);

	// handle oauth failure
	if (this.user.oauth) {
		this.redirect('/login/' + this.params.provider + '/failed');
		return;
	}

	this.user.local = yield matchUser.apply(this);
	this.user.local = yield createUser.apply(this);

	this.state.login = yield loginUser.apply(this);

	this.redirect('/my');
};
