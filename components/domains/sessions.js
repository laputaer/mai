
/**
 * sessions.js
 *
 * Export oauth domain model
 */

var loginUser = require('./sessions/login-user');
var logoutUser = require('./sessions/logout-user');
var refreshUser = require('./sessions/refresh-user');
var currentUser = require('./sessions/current-user');

module.exports = {
	loginUser: loginUser
	, logoutUser: logoutUser
	, refreshUser: refreshUser
	, currentUser: currentUser
};
