
/**
 * builders.js
 *
 * Available template builders
 */

var doc = require('./doc');
var body = require('./body');
var landing = require('./landing');
var club = require('./club');
var clubNew = require('./club-new');
var clubSearch = require('./club-search');
var clubProfile = require('./club-profile');
var clubEditor = require('./club-editor');
var login = require('./login');
var userProfile = require('./user-profile');
var prepareData = require('./prepare-data');
var customError = require('./custom-error');
var placeholder = require('./placeholder');

module.exports = {
	doc: doc
	, body: body
	, prepareData: prepareData
	, customError: customError
	, landing: landing
	, club: club
	, clubNew: clubNew
	, clubSearch: clubSearch
	, clubProfile: clubProfile
	, clubEditor: clubEditor
	, userProfile: userProfile
	, login: login
	, placeholder: placeholder
};
