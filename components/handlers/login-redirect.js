
/**
 * login-redirect.js
 *
 * Set a redirect target when login is completed
 */

var getRoute = require('koa-router').url;

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var sessionDomain = require('../domains/session');
var validate = require('../security/validation');

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
	var input = this.request.query;

	// STEP 2: skip login user
	if (data.current_user) {
		this.redirect('/');
		return;
	}

	// STEP 3: validate input
	var result = yield validate(input, 'redirect');

	if (!result.valid) {
		this.redirect('/');
		return;
	}

	// STEP 4: build route
	var route = '';
	if (input.section) {
		route += '/' + ':section';
	}
	if (input.id) {
		route += '/' + ':id';
	}
	if (input.action) {
		route += '/' + ':action';
	}

	// STEP 5: put route into session store
	yield sessionDomain.setRedirect({
		session: this.session
		, path: getRoute(route, input)
	});

	// STEP 6: render page
	this.state.vdoc = builder(data);
};
