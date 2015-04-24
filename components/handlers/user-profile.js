
/**
 * user-profile.js
 *
 * Koa route handler for full user profile
 */

var builders = require('../builders/builders');
var usersDomain = require('../domains/users');

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

	// prepare common data
	var data = builders.prepareData(this);

	// STEP 1: get user profile
	try {
		data.user = yield usersDomain.matchUser({
			db: this.db
			, uid: this.params.uid
		});
	} catch(err) {
		this.app.emit('error', err, this);
	}

	if (!data.user) {
		data.message = data.i18n.t('error.not-found-user');
		data.body.push(builders.notFoundError(data));
	} else {
		data.body.push(builders.userProfile(data));
	}

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
