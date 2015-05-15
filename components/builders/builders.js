
/**
 * builders.js
 *
 * Available template builders
 */

var doc = require('./doc');
var body = require('./body');
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
var help = require('./help');
var clubAddPostForm = require('./club-add-post-form');
var clubAddConfirmForm = require('./club-add-confirm-form');
var home = require('./home');
var clubRanking = require('./club-ranking');

module.exports = {
	doc: doc
	, body: body
	, prepareData: prepareData
	, customError: customError
	, club: club
	, clubNew: clubNew
	, clubSearch: clubSearch
	, clubProfile: clubProfile
	, clubEditor: clubEditor
	, userProfile: userProfile
	, login: login
	, placeholder: placeholder
	, help: help
	, clubAddPostForm: clubAddPostForm
	, clubAddConfirmForm: clubAddConfirmForm
	, home: home
	, clubRanking: clubRanking
};
