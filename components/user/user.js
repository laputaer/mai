
/**
 * user.js
 *
 * Koa route handler for user login
 */

var getUserProfile = require('./get-user-profile');
var matchUser = require('./match-user');
var updateUser = require('./update-user');
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
	if (!this.user.oauth) {
		this.redirect('/login/' + this.params.provider + '/failed');
		return;
	}

	this.user.local = yield matchUser.apply(this);
	if (this.user.local) {
		this.user.local = yield updateUser.apply(this);
	} else {
		this.user.local = yield createUser.apply(this);
	}

	// handle database failure
	if (!this.user.local) {
		this.redirect('/login/' + this.params.provider + '/error');
		return;
	}

	var status = yield loginUser.apply(this);

	// handle session store failure
	if (!status) {
		this.redirect('/login/' + this.params.provider + '/error');
		return;
	}

	// redirect to user profile
	var local = this.user.local;
	var pid = local.provider.substr(0, 1) + local.id;
	this.redirect('/u/' + pid);
};
