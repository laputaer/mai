
/**
 * club-create.js
 *
 * Koa route handler for club page
 */

var usersDomain = require('../domains/users');
var clubsDomain = require('../domains/clubs');

var validator = require('validator');
var hasAttrs = require('../helpers/has-required-attributes');
var findUser = require('./find-user');
var matchClub = require('./match-club');
var createClub = require('./create-club');

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

	var user = this.state.user;
	var body = this.request.body;
	var flash = {};

	// TODO: xss on output
	// TODO: replace validator

	// missing input
	var attrs = hasAttrs(body, ['title', 'slug'], true);
	if (attrs.length > 0) {
		this.flash = {
			type: 'form'
			, message: 'error.form-required-input-missing'
			, attrs: attrs
			, body: body
		};
		this.redirect('/club/add');
		return;
	}

	// input validation
	if (!validator.isLength(body.title, 2, 32)) {
		if (!flash.attrs) {
			flash.attrs = ['title'];
		} else {
			flash.attrs.push('title');
		}
	}

	body.slug = body.slug.toLowerCase();
	if (!validator.isLength(body.slug, 2, 16)
		|| !validator.matches(body.slug, '^[A-Za-z0-9-]+$')
		|| validator.contains(body.slug, '--')
		|| body.slug.substr(0, 1) === '-'
		|| body.slug.substr(-1) === '-'
	) {
		if (!flash.attrs) {
			flash.attrs = ['slug'];
		} else {
			flash.attrs.push('slug');
		}
	}

	// validation error
	if (flash.attrs) {
		flash.type = 'form';
		flash.message = 'error.form-input-invalid';
		flash.body = body;

		this.flash = flash;
		this.redirect('/club/add');
		return;
	}

	// STEP 1: get full user data
	user = yield usersDomain.matchUser({
		db: this.db
		, uid: user.uid
	});

	// check user action point
	if (user.action_point < 10) {
		this.flash = {
			type: 'form'
			, message: 'error.insufficient-action-point'
			, messageData: {
				required: 10
				, current: user.action_point
			}
			, attrs: []
			, body: body
		};
		this.redirect('/club/add');
		return;
	}

	// STEP 2: find existing club
	var club = yield clubsDomain.matchClub({
		db: this.db
		, slug: body.club
	});

	// club already exists
	if (club) {
		this.flash = {
			type: 'form'
			, message: 'club.already-exist'
			, attrs: ['slug']
			, body: body
		};
		this.redirect('/club/add');
		return;
	}

	// STEP 3: create new club
	club = yield clubsDomain.createClub({
		db: this.db
		, user: user
		, data: body
	});

	// unexpected error
	if (!club) {
		this.flash = {
			type: 'form'
			, message: 'error.form-internal-error'
			, attrs: []
			, body: body
		};
		this.redirect('/club/add');
		return;
	}

	this.redirect('/club');
};
