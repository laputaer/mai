
/**
 * page-login.js
 *
 * Handle oauth user login
 */

var oauthDomain = require('../domains/oauth');
var usersDomain = require('../domains/users');
var sessionDomain = require('../domains/session');
var mixpanelDomain = require('../domains/mixpanel');

var validate = require('../security/validation');
var normalize = require('../security/normalization');
var createError = require('../helpers/create-error-message');
var i18n = require('../templates/i18n')();

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

	if (!provider || !this.config.oauth[provider]) {
		return;
	}

	// STEP 2: get oauth response
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

	// STEP 3: get oauth profile
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

	// STEP 4: normalize and validate user profile
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

	// STEP 5: create/update local profile
	user.local = yield usersDomain.matchUser({
		db: this.db
		, uid: user.oauth.uid
	});

	if (user.local !== null) {
		user.local = yield usersDomain.updateUser({
			db: this.db
			, profile: user.oauth
		});

		mixpanelDomain.userLogin({
			mixpanel: this.mixpanel
			, user: user.local
			, request: this.request
		});
	} else {
		user.local = yield usersDomain.createUser({
			db: this.db
			, profile: user.oauth
		});

		mixpanelDomain.userRegister({
			mixpanel: this.mixpanel
			, user: user.local
			, request: this.request
		});
	}

	// STEP 6: upgrade user session
	yield sessionDomain.loginUser({
		config: this.config
		, session: this.session
		, cache: this.cache
		, local: user.local
		, oauth: user.oauth
	});

	this.redirect('/');
};
