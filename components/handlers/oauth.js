
/**
 * oauth.js
 *
 * Handle oauth user login
 */

var oauthDomain = require('../domains/oauth');
var usersDomain = require('../domains/users');
var sessionDomain = require('../domains/session');
var validate = require('../security/validation');

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

	// TODO: we should make error more verbose

	// provider not supported
	if (!provider || !this.config.oauth[provider]) {
		this.redirect('/login/' + provider + '/failed');
		return;
	}

	// get redirect path
	var path = yield sessionDomain.getRedirect({
		session: this.session
	});

	// STEP 1: get oauth response
	var response = yield sessionDomain.getOauthResponse({
		session: this.session
	});

	if (!response) {
		this.redirect('/login/' + provider + '/failed');
		return;
	}

	// STEP 2: get oauth profile
	try {
		user.oauth = yield oauthDomain.getUserProfile({
			provider: provider
			, config: this.config
			, response: this.session.grant.response
		});

		yield sessionDomain.clearOauthResponse({
			session: this.session
		});
	} catch(err) {
		this.app.emit('error', err, this);
	}

	// handle oauth failure
	if (!user.oauth) {
		this.redirect('/login/' + provider + '/failed');
		return;
	}

	// STEP 3: validate user profile
	var result = yield validate(user.oauth, 'oauth');

	if (!result.valid) {
		this.redirect('/login/' + provider + '/failed');
		return;
	}

	// STEP 4: create/update local profile
	user.local = yield usersDomain.matchUser({
		db: this.db
		, uid: user.oauth.uid
	});

	if (user.local !== null) {
		user.local = yield usersDomain.updateUser({
			db: this.db
			, profile: user.oauth
		});
	} else {
		user.local = yield usersDomain.createUser({
			db: this.db
			, profile: user.oauth
		});
	}

	// STEP 5: update user session
	yield sessionDomain.loginUser({
		config: this.config
		, session: this.session
		, cache: this.cache
		, local: user.local
		, oauth: user.oauth
	});

	// STEP 6: follow redirect
	if (path) {
		this.redirect(path);
		return;
	}

	this.redirect('/u/' + user.local.uid);
};
