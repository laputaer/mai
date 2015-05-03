
/**
 * club-home.js
 *
 * Koa route handler for club profile
 */

var builders = require('../builders/builders');

var clubsDomain = require('../domains/clubs');
var usersDomain = require('../domains/users');

var getCoolInitials = require('../helpers/get-cool-initials');
var createError = require('../helpers/create-error-message');

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

	// STEP 1: prepare common data
	var data = builders.prepareData(this);

	// STEP 2: find club
	data.club = yield clubsDomain.matchClub({
		db: this.db
		, slug: this.params.slug
	});

	if (!data.club) {
		this.state.error_page = createError(
			404
			, data.i18n.t('error.not-found-club')
		);
		return;
	}

	data.club.initials = getCoolInitials(data.club.title);

	// STEP 3: find club owner
	data.owner = yield usersDomain.matchUser({
		db: this.db
		, uid: data.club.owner
	});

	// STEP 4: find user if login
	if (data.current_user) {
		data.user = yield usersDomain.matchUser({
			db: this.db
			, uid: data.current_user.uid
		});
	}

	// STEP 5: render page
	data.body.push(builders.clubProfile(data));
	this.state.vdoc = builders.doc(data);
};
