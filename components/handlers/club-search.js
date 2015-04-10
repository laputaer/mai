
/**
 * club-search.js
 *
 * Koa route handler for club search page
 */

var validator = require('validator');
var xss = require('xss');
var escapeRegex = require('escape-string-regexp');
var builders = require('../builders/builders');
var removeSlash = require('../helpers/remove-trailing-slash');
var searchClubs = require('./search-clubs');

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

	// input validation
	var search = this.request.query.q;
	if (!search) {
		search = '';
	}

	if (!validator.isLength(search, 2, 100)) {
		search = '';
	}

	search = escapeRegex(search);
	search = xss(search);

	// pass processed search back
	this.state.search = search;
	data.search = search;

	// guest user
	if (!data.current_user) {
		data.body.push(builders.login(data));

	// login user
	} else {
		if (!search) {
			data.clubs = [];
		} else {
			data.clubs = yield searchClubs.apply(this);
		}
		data.body.push(builders.clubSearch(data));
	}

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
