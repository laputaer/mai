
/**
 * builders.js
 *
 * Available template builders
 */

var doc = require('./doc');
var landing = require('./landing');
var club = require('./club');
var clubNew = require('./club-new');
var clubSearch = require('./club-search');
var clubProfile = require('./club-profile');
var clubEditor = require('./club-editor');
var internalError = require('./internal-error');
var oauthError = require('./oauth-error');
var notFoundError = require('./not-found-error');
var login = require('./login');
var userProfile = require('./user-profile');
var prepareData = require('./prepare-data');
var customError = require('./custom-error');

module.exports = {
	doc: doc
	, prepareData: prepareData
	, customError: customError
	, landing: landing
	, club: club
	, clubNew: clubNew
	, clubSearch: clubSearch
	, clubProfile: clubProfile
	, clubEditor: clubEditor
	, userProfile: userProfile
	, internalError: internalError
	, oauthError: oauthError
	, notFoundError: notFoundError
	, login: login
};
