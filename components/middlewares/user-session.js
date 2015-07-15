
/**
 * user-session.js
 *
 * Load user session data into global context
 */

var sessionDomain = require('../domains/session');
var mixpanelDomain = require('../domains/mixpanel');
var getAvatarVariant = require('../helpers/get-avatar-variant');
var proxyUrl = require('../security/proxy');

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
	var user;

	// STEP 1: load user from cache
	try {
		user = yield sessionDomain.currentUser({
			session: this.session
			, cache: this.cache
		});
	} catch(err) {
		this.app.emit('error', err, this);
	}

	// STEP 2: guest user
	if (!user) {
		yield next;
		return;
	}

	// STEP 3: refresh user session
	var now = Date.now();
	var last_seen = parseInt(user.last_seen, 10);

	// limit refresh rate to at most every 5 minutes
	if (!isNaN(last_seen) && last_seen < now - 1000 * 60 * 5) {
		user = yield sessionDomain.refreshUser({
			session: this.session
			, cache: this.cache
			, config: this.config
		});
	}

	// limit log rate to at most every hour
	if (!isNaN(last_seen) && last_seen < now - 1000 * 60 * 60) {
		mixpanelDomain.userVisit({
			mixpanel: this.mixpanel
			, user: user
			, request: this.request
		});
	}

	// STEP 4: create csrf token for this request
	user.csrf_token = yield sessionDomain.getCsrfToken({
		session: this.session
		, cache: this.cache
	});

	// STEP 5: prepare user data for rendering
	user.small_avatar = proxyUrl({
		url: getAvatarVariant(user, 400)
		, key: this.config.proxy.key
		, base: this.state.image_base_url
		, size: 'sq-tiny'
	});

	this.state.user = user;

	yield next;
};
