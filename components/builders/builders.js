
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
var internalError = require('./internal-error');
var oauthError = require('./oauth-error');
var notFoundError = require('./not-found-error');
var login = require('./login');
var userProfile = require('./user-profile');
var prepareData = require('./prepare-data');

module.exports = {
	doc: doc
	, prepareData: prepareData
	, landing: landing
	, club: club
	, clubNew: clubNew
	, clubSearch: clubSearch
	, clubProfile: clubProfile
	, userProfile: userProfile
	, internalError: internalError
	, oauthError: oauthError
	, notFoundError: notFoundError
	, login: login
};
