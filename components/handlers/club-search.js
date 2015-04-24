
/**
 * club-search.js
 *
 * Koa route handler for club search page
 */

var validator = require('validator');
var escapeRegex = require('escape-string-regexp');

var builders = require('../builders/builders');
var clubsDomain = require('../domains/clubs');

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
		this.state.vdoc = builders.doc(data);
		return;
	}

	// TODO: xss on output
	// TODO: replace validator

	// input validation
	var search = this.request.query.q;
	if (!search) {
		search = '';
	}

	if (!validator.isLength(search, 2, 100)) {
		search = '';
	}

	search = escapeRegex(search);
	data.search = search;

	// login user
	if (!data.search) {
		data.clubs = [];
	} else {
		data.clubs = yield clubsDomain.searchClubs({
			db: this.db
			, search: data.search
		});
	}

	data.body.push(builders.clubSearch(data));

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
