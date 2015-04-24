
/**
 * club.js
 *
 * Koa route handler for club page
 */

var builders = require('../builders/builders');
var removeSlash = require('../helpers/remove-trailing-slash');
var findUser = require('./find-user');
var findClubs = require('./find-clubs');
var findJoinedClubs = require('./find-joined-clubs');

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

	// guest user
	if (!data.current_user) {
		data.body.push(builders.login(data));

	// login user
	} else {
		data.user = yield findUser.apply(this);
		data.clubs = yield findClubs.apply(this);
		data.joined_clubs = yield findJoinedClubs.apply(this);
		data.body.push(builders.club(data));
	}

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
