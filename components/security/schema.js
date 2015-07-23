
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
var oembedContent = require('./schema/oembed-content');
var opengraph = require('./schema/opengraph');
var postStart = require('./schema/post-start');
var postConfirm = require('./schema/post-confirm');
var query = require('./schema/query');

module.exports = {
	club: club
	, oauth: oauth
	, search: search
	, redirect: redirect
	, proxy: proxy
	, oembedImage: oembedImage
	, oembedContent: oembedContent
	, opengraph: opengraph
	, postStart: postStart
	, postConfirm: postConfirm
	, query: query
};
