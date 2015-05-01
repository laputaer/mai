
/**
 * schema.js
 *
 * Export object validation rules
 */

var club = require('./schema/club');
var oauth = require('./schema/oauth');
var search = require('./schema/search');
var redirect = require('./schema/redirect');

module.exports = {
	club: club
	, oauth: oauth
	, search: search
	, redirect: redirect
};
