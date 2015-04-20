
/**
 * user-session.js
 *
 * Login user automatically, using session data
 */

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
	var uid = this.session.uid;
	var cache = this.cache;

	// guest user, ignore
	if (!uid) {
		yield next;
		return;
	}

	// existing user, load from session store
	var data;
	try {
		data = yield cache.get('users:' + uid);
		data = JSON.parse(data);
	} catch(err) {
		// if session store doesn't contain user, logout session
		data = false;
		this.session.uid = undefined;
		this.session.ts = Date.now();
		this.app.emit('error', err, this);
	}

	if (!data) {
		yield next;
		return;
	}

	this.state.user = data;
	yield next;
};
