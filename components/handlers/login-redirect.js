
/**
 * login-redirect.js
 *
 * Set a redirect target when login is completed
 */

var builders = require('../builders/builders');
var sessionDomain = require('../domains/session');
var validate = require('../security/validation');
var getRoute = require('koa-router').url;

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
	var data = builders.prepareData(this);
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

	// STEP 5: redirect path into session store
	yield sessionDomain.setRedirect({
		session: this.session
		, path: getRoute(route, input)
	});

	// STEP 6: display login page
	data.body.push(builders.login(data));
	this.state.vdoc = builders.doc(data);
};
