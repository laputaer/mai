
/**
 * users.js
 *
 * Export users domain model
 */

var matchUser = require('./users/match-user');
var createUser = require('./users/create-user');
var updateUser = require('./users/update-user');
var getUsersByIds = require('./users/get-users-by-ids');
var createAppPassword = require('./users/create-app-password');
var matchAppPassword = require('./users/match-app-password');
var matchAppName = require('./users/match-app-name');
var removeAppPassword = require('./users/remove-app-password');
var getUserApps = require('./users/get-user-apps');

module.exports = {
	matchUser: matchUser
	, createUser: createUser
	, updateUser: updateUser
	, getUsersByIds: getUsersByIds
	, createAppPassword: createAppPassword
	, matchAppPassword: matchAppPassword
	, matchAppName: matchAppName
	, removeAppPassword: removeAppPassword
	, getUserApps: getUserApps
};
