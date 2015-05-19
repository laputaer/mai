
/**
 * club-search.js
 *
 * Koa route handler for club search page
 */

var escapeRegex = require('escape-string-regexp');

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var clubsDomain = require('../domains/clubs');
var validate = require('../security/validation');
var formError = require('../helpers/create-form-message');

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
	var data = prepareData(this);
	var query = this.request.query;

	// STEP 2: input validation
	var result = yield validate(query, 'search');

	if (!result.valid) {
		this.flash = formError(
			this.i18n.t('error.form-input-invalid')
			, query
			, ['q']
		);
		this.redirect('/c/club-search');
		return;
	}

	// STEP 3: empty input or initial state
	if (!query.q) {
		data.search = '';
		data.clubs = [];
		this.state.vdoc = builder(data);
		return;
	}

	// STEP 4: run search
	data.search = query.q;
	data.clubs = yield clubsDomain.searchClubs({
		db: this.db
		, search: escapeRegex(query.q)
	});

	// STEP 5: render page
	this.state.vdoc = builder(data);
};
