
/**
 * club-create.js
 *
 * Koa route handler for club page
 */

var validator = require('validator');
var xss = require('xss');
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

	// missing input
	var body = this.request.body;
	if (!hasAttrs(body, ['title', 'slug', 'image'])) {
		this.redirect('/club/add');
		return;
	}

	// input validation
	body.title = xss(body.title);
	if (!validator.isLength(body.title, 2, 32)) {
		this.redirect('/club/add');
		return;
	}

	body.slug = xss(body.slug);
	body.slug = body.slug.toLowerCase();
	if (!validator.isLength(body.slug, 2, 16)
		|| !validator.matches(body.slug, '^[A-Za-z0-9-]+$')
		|| validator.contains(body.slug, '--')
		|| body.slug.substr(0, 1) === '-'
		|| body.slug.substr(-1) === '-'
	) {
		this.redirect('/club/add');
		return;
	}

	body.image = xss(body.image);
	if (!validator.isURL(body.image) || !validator.isLength(body.image, 1, 100)) {
		this.redirect('/club/add');
		return;
	}

	// pass sanitized input back
	this.state.input = body;

	this.user = {};
	this.user.local = yield findUser.apply(this);

	var club = yield matchClub.apply(this);

	// club already exists
	if (club) {
		this.redirect('/club/add');
		return;
	}

	club = yield createClub.apply(this);

	// something wrong with database
	if (!club) {
		this.redirect('/club/add');
		return;
	}

	this.redirect('/club/' + club.slug);
};
