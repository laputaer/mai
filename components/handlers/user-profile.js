
/**
 * user-profile.js
 *
 * Koa route handler for full user profile
 */

var builders = require('../builders/builders');
var usersDomain = require('../domains/users');

var getAvatarVariant = require('../helpers/get-avatar-variant');
var getUserOrigin = require('../helpers/get-user-origin');
var proxy = require('../security/proxy');

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
	data.user = yield usersDomain.matchUser({
		db: this.db
		, uid: this.params.uid
	});

	if (!data.user) {
		data.message = data.i18n.t('error.not-found-user');
		data.body.push(builders.notFoundError(data));
		this.state.vdoc = builders.doc(data);
		return;
	}

	data.user.full_avatar = proxy(getAvatarVariant(data.user, 400), this.config.proxy.key, 400);
	data.user.user_origin = getUserOrigin(data.user);

	data.body.push(builders.userProfile(data));

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
