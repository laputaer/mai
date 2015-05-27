
/**
 * oauth.js
 *
 * Handle oauth user login
 */

var oauthDomain = require('../domains/oauth');
var usersDomain = require('../domains/users');
var sessionDomain = require('../domains/session');
var validate = require('../security/validation');
var normalize = require('../security/normalization');
var createError = require('../helpers/create-error-message');

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

	// STEP 1: prepare common data
	var provider = this.params.provider;
	var user = {};
	var i18n = this.i18n;

	if (!provider || !this.config.oauth[provider]) {
		return;
	}

	// STEP 2: get pending redirection
	var path = yield sessionDomain.getRedirect({
		session: this.session
	});

	// STEP 3: get oauth response
	var response = yield sessionDomain.getOauthResponse({
		session: this.session
	});

	if (!response) {
		this.state.error_page = createError(
			500
			, i18n.t('error.oauth-error-response', {
				provider: provider
			})
		);
		return;
	}

	// STEP 4: get oauth profile
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

	if (!user.oauth) {
		this.state.error_page = createError(
			500
			, i18n.t('error.oauth-error-profile', {
				provider: provider
			})
		);
		return;
	}

	// STEP 5: normalize and validate user profile
	user.oauth = normalize(user.oauth, 'oauth');

	var result = yield validate(user.oauth, 'oauth');

	if (!result.valid) {
		this.state.error_page = createError(
			500
			, i18n.t('error.oauth-invalid-profile', {
				provider: provider
			})
		);
		return;
	}

	// STEP 6: create/update local profile
	user.local = yield usersDomain.matchUser({
		db: this.db
		, uid: user.oauth.uid
	});

	if (user.local !== null) {
		user.local = yield usersDomain.updateUser({
			db: this.db
			, profile: user.oauth
		});

		this.mixpanel.track('user_login', {
			distinct_id: user.local.uid
		});
	} else {
		user.local = yield usersDomain.createUser({
			db: this.db
			, profile: user.oauth
		});

		this.mixpanel.track('user_register', {
			distinct_id: user.local.uid
		});
	}

	this.mixpanel.people.set(user.local.uid, {
		'$first_name': user.local.name
		, '$last_name': user.local.login
		, '$created': user.local.created.toISOString()
		, provider: user.local.provider
		, action_point: user.local.action_point
		, action_base: user.local.action_base
	});

	// STEP 7: update user session
	yield sessionDomain.loginUser({
		config: this.config
		, session: this.session
		, cache: this.cache
		, local: user.local
		, oauth: user.oauth
	});

	// STEP 8: follow redirect, if any
	if (path) {
		this.redirect(path);
		return;
	}

	this.redirect('/u/' + user.local.uid);
};
