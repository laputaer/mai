
/**
 * oauth.js
 *
 * Handle oauth user login
 */

var oauth = require('../domains/oauth');
var users = require('../domains/users');
var sessions = require('../domains/sessions');

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

	var provider = this.params.provider;
	var user = {};

	// provider not supported
	if (!provider || !this.config.oauth[provider]) {
		this.redirect('/login/' + provider + '/failed');
		return;
	}

	// oauth info missing
	if (!this.session.grant || !this.session.grant.response) {
		this.redirect('/login/' + provider + '/failed');
		return;
	}

	// STEP 1: get oauth profile
	try {
		user.oauth = yield oauth.getUserProfile({
			provider: provider
			, config: this.config
			, response: this.session.grant.response
		});

		// clear user oauth info on successful profile fetch
		delete this.session.grant;
	} catch(err) {
		this.app.emit('error', err, this);
	}

	// handle oauth failure
	if (!user.oauth) {
		this.redirect('/login/' + provider + '/failed');
		return;
	}

	// STEP 2: create/update local profile
	try {
		user.local = yield users.matchUser({
			db: this.db
			, uid: user.oauth.uid
		});

		if (user.local !== null) {
			user.local = yield users.updateUser({
				db: this.db
				, profile: user.oauth
			});
		} else {
			user.local = yield users.createUser({
				db: this.db
				, profile: user.oauth
			});
		}
	} catch(err) {
		this.app.emit('error', err, this);
	}

	// handle database failure
	if (!user.local) {
		this.redirect('/login/' + provider + '/error');
		return;
	}

	// STEP 3: update user session
	try {
		yield sessions.loginUser({
			config: this.config
			, session: this.session
			, cache: this.cache
			, profile: user.local
		});
	} catch(err) {
		this.app.emit('error', err, this);

		// handle session/cache error
		this.redirect('/login/' + provider + '/error');
		return;
	}

	this.redirect('/u/' + user.local.uid);
};
