
/**
 * builders.js
 *
 * Available template builders
 */

var doc = require('./doc');
var landing = require('./landing');
var internalError = require('./internal-error');
var oauthError = require('./oauth-error');
var notFoundError = require('./not-found-error');
var login = require('./login');
var userProfile = require('./user-profile');

module.exports = {
	doc: doc
	, landing: landing
	, userProfile: userProfile
	, internalError: internalError
	, oauthError: oauthError
	, notFoundError: notFoundError
	, login: login
};
