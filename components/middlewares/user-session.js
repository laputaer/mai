
/**
 * user-session.js
 *
 * Load user session data into global context
 */

var sessionDomain = require('../domains/session');
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
	var user;
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

		// refresh session/cache at most every 5 minutes
		if (user && parseInt(user.last_seen, 10) < Date.now() - 1000 * 60 * 5) {
			user = yield sessionDomain.refreshUser({
				session: this.session
				, cache: this.cache
				, config: this.config
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
