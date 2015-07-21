
/**
 * api-global-config.js
 *
 * API for creating favorite
 */

var getStandardJson = require('../helpers/get-standard-json');
var i18n = require('../templates/i18n')();

var clubsDomain = require('../domains/clubs');
var socialDomain = require('../domains/social');
var mixpanelDomain = require('../domains/mixpanel');

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

	// STEP 1: handle guest user
	if (!this.session.uid) {
		this.state.json = getStandardJson(null, 400, i18n.t('error.login-required'));
		return;
	}

	// STEP 2: prepare common data
	var pid = this.params.pid;

	// STEP 3: make sure post exist
	var post = yield clubsDomain.matchPost({
		db: this.db
		, pid: pid
	});

	if (!post) {
		this.state.json = getStandardJson(null, 400, i18n.t('error.not-found-post'));
		return;
	}

	// STEP 4: make sure favorite doesn't exist
	var exist = yield socialDomain.matchFavoritePost({
		db: this.db
		, pid: pid
		, uid: this.session.uid
	});

	if (exist) {
		this.state.json = getStandardJson(null, 400, i18n.t('error.duplicate-action'));
		return;
	}

	// STEP 5: save favorite
	yield socialDomain.createFavoritePost({
		db: this.db
		, post: post
		, user: this.state.user
	});

	mixpanelDomain.postFavorite({
		mixpanel: this.mixpanel
		, post: post
		, user: this.state.user
		, request: this.request
	});

	// STEP 5: output json
	this.state.json = getStandardJson(null, 200, i18n.t('placeholder.action-done'));
};
