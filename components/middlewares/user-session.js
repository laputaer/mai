
/**
 * user-session.js
 *
 * Load user session data into global context
 */

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
	// STEP 1: load from cache
	var user;
	try {
		user = yield sessions.currentUser({
			session: this.session
			, cache: this.cache
		});

		// refresh session/cache at most every 5 minutes
		if (user && parseInt(user.last_seen, 10) < Date.now() - 1000 * 60 * 5) {
			user = yield sessions.refreshUser({
				session: this.session
				, cache: this.cache
				, config: this.config
			});
		}
	} catch(err) {
		this.app.emit('error', err, this);
	}

	if (user) {
		this.state.user = user;
	}

	yield next;
};
