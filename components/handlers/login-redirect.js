
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

	// prepare common data
	var data = builders.prepareData(this);
	var input = this.request.query;

	// STEP 1: skip login user
	if (data.current_user) {
		this.redirect('/');
		return;
	}

	// STEP 2: validate input
	var result = yield validate(input, 'redirect');

	if (!result.valid) {
		this.redirect('/');
		return;
	}

	// STEP 3: put it in session store
	yield sessionDomain.setRedirect({
		session: this.session
		, path: getRoute('/' + input.section + '/:id', input)
	})

	// show login page
	data.body.push(builders.login(data));
	this.state.vdoc = builders.doc(data);
};
