
/**
 * schema.js
 *
 * Export object validation rules
 */

var club = require('./schema/club');
var oauth = require('./schema/oauth');
var search = require('./schema/search');
var redirect = require('./schema/redirect');
var proxy = require('./schema/proxy');
var oembedImage = require('./schema/oembed-image');

module.exports = {
	club: club
	, oauth: oauth
	, search: search
	, redirect: redirect
	, proxy: proxy
	, oembedImage: oembedImage
};
