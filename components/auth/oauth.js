
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
	this.user = {};

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
		this.user.oauth = yield oauth.getUserProfile({
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
	if (!this.user.oauth) {
		this.redirect('/login/' + provider + '/failed');
		return;
	}

	// STEP 2: create/update local profile
	try {
		this.user.local = yield users.matchUser({
			db: this.db
			, uid: this.user.oauth.uid
		});

		if (this.user.local !== null) {
			this.user.local = yield users.updateUser({
				db: this.db
				, profile: this.user.oauth
			});
		} else {
			this.user.local = yield users.createUser({
				db: this.db
				, profile: this.user.oauth
			});
		}
	} catch(err) {
		this.app.emit('error', err, this);
	}

	// handle database failure
	if (!this.user.local) {
		this.redirect('/login/' + provider + '/error');
		return;
	}

	// STEP 3: update user session
	try {
		yield sessions.loginUser({
			config: this.config
			, session: this.session
			, cache: this.cache
			, profile: this.user.local
		});
	} catch(err) {
		this.app.emit('error', err, this);

		// handle session/cache error
		this.redirect('/login/' + provider + '/error');
		return;
	}

	// redirect to user profile
	var local = this.user.local;
	var pid = local.provider.substr(0, 1) + local.id;
	this.redirect('/u/' + pid);
};
