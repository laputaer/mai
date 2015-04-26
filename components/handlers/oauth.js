
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

	// oauth info missing
	if (!this.session.grant || !this.session.grant.response) {
		this.redirect('/login/' + provider + '/failed');
		return;
	}

	// STEP 1: get oauth profile
	try {
		user.oauth = yield oauthDomain.getUserProfile({
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

	// STEP 2: validate user profile
	var result = yield validate(user.oauth, 'oauth');

	if (!result.valid) {
		this.redirect('/login/' + provider + '/failed');
		return;
	}

	// STEP 3: create/update local profile
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

	// STEP 4: update user session
	yield sessionDomain.loginUser({
		config: this.config
		, session: this.session
		, cache: this.cache
		, profile: user.local
	});

	this.redirect('/u/' + user.local.uid);
};
