
/**
 * mixpanel.js
 *
 * Export mixpanel analytics model
 */

var userLogin = require('./mixpanel/user-login');
var userRegister = require('./mixpanel/user-register');
var userProfileUpdate = require('./mixpanel/user-profile-update');
var clubCreate = require('./mixpanel/club-create');

module.exports = {
	userLogin: userLogin
	, userRegister: userRegister
	, userProfileUpdate: userProfileUpdate
	, clubCreate: clubCreate
};
