
/**
 * club-join.js
 *
 * Koa route handler for joining a club
 */

var builders = require('../builders/builders');
var findUser = require('./find-user');
var findClub = require('./find-club');
var checkMembership = require('./check-membership');
var joinClub = require('./join-club');

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

	// guest user
	if (!this.state.user) {
		this.redirect('/club');
		return;
	}

	this.user = yield findUser.apply(this);

	// check user action point
	if (this.user.action_point < 2) {
		this.flash = {
			type: 'form'
			, message: 'error.insufficient-action-point'
			, messageData: {
				required: 2
				, current: this.user.action_point
			}
			, attrs: []
			, body: body
		};
		this.redirect('/c/' + this.params.slug);
		return;
	}

	this.club = yield findClub.apply(this);

	// club does not exists
	if (!this.club) {
		this.redirect('/club');
		return;
	}

	var member = yield checkMembership.apply(this);

	// already a member of the club
	if (member) {
		this.redirect('/club');
		return;
	}

	yield joinClub.apply(this);
	this.redirect('/club');
};
