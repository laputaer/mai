
/**
 * builders.js
 *
 * Available template builders
 */

var doc = require('./doc');
var landing = require('./landing');
var internalError = require('./internal-error');
var oauthError = require('./oauth-error');
var login = require('./login');
var my = require('./my');

module.exports = {
	doc: doc
	, landing: landing
	, internalError: internalError
	, oauthError: oauthError
	, login: login
	, my: my
};
