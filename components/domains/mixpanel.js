
/**
 * mixpanel.js
 *
 * Export mixpanel analytics model
 */

var userLogin = require('./mixpanel/user-login');
var userRegister = require('./mixpanel/user-register');
var clubCreate = require('./mixpanel/club-create');
var clubJoin = require('./mixpanel/club-join');
var clubLeave = require('./mixpanel/club-leave');
var postPreview = require('./mixpanel/post-preview');
var postCreate = require('./mixpanel/post-create');

module.exports = {
	userLogin: userLogin
	, userRegister: userRegister
	, clubCreate: clubCreate
	, clubJoin: clubJoin
	, clubLeave: clubLeave
	, postPreview: postPreview
	, postCreate: postCreate
};
