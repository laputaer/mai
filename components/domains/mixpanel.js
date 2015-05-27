
/**
 * mixpanel.js
 *
 * Export mixpanel analytics model
 */

var userLogin = require('./mixpanel/user-login');
var userRegister = require('./mixpanel/user-register');
var updateUser = require('./mixpanel/update-user');

module.exports = {
	userLogin: userLogin
	, userRegister: userRegister
	, updateUser: updateUser
};
