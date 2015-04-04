
/**
 * builders.js
 *
 * Available template builders
 */

var doc = require('./doc');
var landing = require('./landing');
var internalError = require('./internal-error');
var oauthError = require('./oauth-error');
var home = require('./home');
var login = require('./login');

module.exports = {
	doc: doc
	, landing: landing
	, internalError: internalError
	, oauthError: oauthError
	, home: home
	, login: login
};
