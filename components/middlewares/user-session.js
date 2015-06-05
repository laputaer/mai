
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
	// STEP 1: load from cache
	var user, now, last_seen;
	try {
		user = yield sessionDomain.currentUser({
			session: this.session
			, cache: this.cache
		});

		// create a new csrf token on each request, do not expose secret by default
		if (user) {
			user.csrf_token = yield sessionDomain.getCsrfToken({
				session: this.session
				, cache: this.cache
			});
			delete user.csrf_secret;
		}

		// make sure we are dealing with login user
		now = Date.now();
		last_seen = user ? parseInt(user.last_seen, 10) : false;

		// refresh session/cache at most every 5 minutes
		if (last_seen && last_seen < now - 1000 * 60 * 5) {
			user = yield sessionDomain.refreshUser({
				session: this.session
				, cache: this.cache
				, config: this.config
			});
		}

		// report user visit if last visit is more than 24 hours ago
		if (last_seen && last_seen < now - 1000 * 60 * 60 * 24) {
			mixpanelDomain.userVisit({
				mixpanel: this.mixpanel
				, user: user
				, request: this.request
			});
		}
	} catch(err) {
		this.app.emit('error', err, this);
	}

	if (user) {
		user.small_avatar = proxyUrl({
			url: getAvatarVariant(user, 400)
			, key: this.config.proxy.key
			, size: 100
			, base: this.state.image_base_url
		});
		this.state.user = user;
	}

	yield next;
};
