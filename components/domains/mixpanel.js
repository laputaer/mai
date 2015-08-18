
/**
 * mixpanel.js
 *
 * Export mixpanel analytics model
 */

var userLogin = require('./mixpanel/user-login');
var userRegister = require('./mixpanel/user-register');
var userVisit = require('./mixpanel/user-visit');
var clubCreate = require('./mixpanel/club-create');
var clubJoin = require('./mixpanel/club-join');
var clubLeave = require('./mixpanel/club-leave');
var postPreview = require('./mixpanel/post-preview');
var postCreate = require('./mixpanel/post-create');
var postFavorite = require('./mixpanel/post-favorite');
var postUnfavorite = require('./mixpanel/post-unfavorite');
var stashAdd = require('./mixpanel/stash-add');
var stashRemove = require('./mixpanel/stash-remove');

module.exports = {
	userLogin: userLogin
	, userRegister: userRegister
	, userVisit: userVisit
	, clubCreate: clubCreate
	, clubJoin: clubJoin
	, clubLeave: clubLeave
	, postPreview: postPreview
	, postCreate: postCreate
	, postFavorite: postFavorite
	, postUnfavorite: postUnfavorite
	, stashAdd: stashAdd
	, stashRemove: stashRemove
};
