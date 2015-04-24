
/**
 * club-home.js
 *
 * Koa route handler for club profile
 */

var builders = require('../builders/builders');

var clubsDomain = require('../domains/clubs');
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

	// STEP 1: find club
	data.club = yield clubsDomain.matchClub({
		db: this.db
		, slug: this.params.slug
	});
	data.current_url = this.request.href;

	// STEP 2: find owner and current user
	if (!data.club) {
		data.message = data.i18n.t('error.not-found-club');
		data.body.push(builders.notFoundError(data));

	} else if (!data.current_user) {
		data.body.push(builders.login(data));

	} else {
		data.owner = yield usersDomain.matchUser({
			db: this.db
			, uid: data.club.owner
		});
		data.user = yield usersDomain.matchUser({
			db: this.db
			, uid: data.current_user.uid
		});

		data.body.push(builders.clubProfile(data));
	}

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
