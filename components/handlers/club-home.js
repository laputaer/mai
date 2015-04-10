
/**
 * club-home.js
 *
 * Koa route handler for club profile
 */

var builders = require('../builders/builders');
var removeSlash = require('../helpers/remove-trailing-slash');
var findClub = require('./find-club');
var findOwner = require('./find-owner');
var findUser = require('./find-user');

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
	data.body = [];

	data.club = yield findClub.apply(this);
	data.current_url = this.request.href;

	if (!data.club) {
		data.message = data.i18n.t('error.not-found-club');
		data.body.push(builders.notFoundError(data));

	} else if (!data.current_user) {
		data.body.push(builders.login(data));

	} else {
		this.state.owner = data.club.owner;
		data.owner = yield findOwner.apply(this);
		data.user = yield findUser.apply(this);

		data.body.push(builders.clubProfile(data));
	}

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
