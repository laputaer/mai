
/**
 * user-profile.js
 *
 * Koa route handler for full user profile
 */

var builders = require('../builders/builders');
var removeSlash = require('../helpers/remove-trailing-slash');
var users = require('../domains/users');

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

	// prepare data
	var data = {};
	data.i18n = this.i18n;
	data.path = removeSlash(this.path);
	data.version = this.config.version;
	data.current_user = this.state.user;

	// STEP 1: get user profile
	try {
		data.user = yield users.matchUser({
			db: this.db
			, uid: this.params.pid
		});
	} catch(err) {
		this.app.emit('error', err, this);
	}

	data.body = [];

	if (!data.user) {
		data.message = data.i18n.t('error.not-found-user');
		data.body.push(builders.notFoundError(data));
	} else {
		data.body.push(builders.userProfile(data));
	}

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
