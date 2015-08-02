
/**
 * user-profile.js
 *
 * API for getting user profile and related information
 */

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var getUserOrigin = require('../helpers/get-user-origin');
var getAvatarVariant = require('../helpers/get-avatar-variant');
var usersDomain = require('../domains/users');
var proxyUrl = require('../security/proxy');
var i18n = require('../templates/i18n')();

var filter_output = [
	'uid', 'id', 'provider', 'login', 'name', 'avatar'
	, 'action_point', 'action_base', 'fav_count', 'fav_point'
	, 'origin'
];

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
	// optional flow control, so this can be used as component
	if (next) {
		yield next;
	}

	// STEP 1: prepare common data
	var config = this.config;
	var state = this.state;
	var uid = this.params.uid;

	// STEP 2: get user profile
	var user_profile = yield usersDomain.matchUser({
		db: this.db
		, uid: uid
	});

	if (!user_profile) {
		if (next) {
			this.state.error_json = getStandardJson(null, 404, i18n.t('error.not-found-user'));
		}
		return;
	}

	// STEP 3: user data transform
	if (user_profile.avatar) {
		user_profile.avatar = proxyUrl({
			url: getAvatarVariant(user_profile, 400)
			, key: config.proxy.key
			, base: state.image_base_url
		});
	}

	if (user_profile.provider && user_profile.login) {
		user_profile.origin = getUserOrigin(user_profile);
	}

	user_profile = filterAttributes(user_profile, filter_output);

	if (!next) {
		return user_profile;
	}

	// STEP 4: output json
	this.state.json = getStandardJson(user_profile);
};
