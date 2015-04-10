
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
	var attrs = hasAttrs(body, ['title', 'slug'], true);
	var flash = {};
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
	body.title = xss(body.title);
	if (!validator.isLength(body.title, 2, 32)) {
		if (!flash.attrs) {
			flash.attrs = ['title'];
		} else {
			flash.attrs.push('title');
		}
	}

	body.slug = xss(body.slug);
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

	// pass sanitized input back
	body.owner = this.session.uid;
	this.state.input = body;

	this.user = yield findUser.apply(this);

	// check user action point
	if (this.user.action_point < 10) {
		this.flash = {
			type: 'form'
			, message: 'error.insufficient-action-point'
			, messageData: {
				required: 10
				, current: this.user.action_point
			}
			, attrs: []
			, body: body
		};
		this.redirect('/club/add');
		return;
	}

	var club = yield matchClub.apply(this);

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

	club = yield createClub.apply(this);

	// something wrong with database
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

	this.redirect('/c/' + club.slug);
};
