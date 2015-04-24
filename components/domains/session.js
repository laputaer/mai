
/**
 * sessions.js
 *
 * Export oauth domain model
 */

var loginUser = require('./session/login-user');
var logoutUser = require('./session/logout-user');
var refreshUser = require('./session/refresh-user');
var currentUser = require('./session/current-user');

module.exports = {
	loginUser: loginUser
	, logoutUser: logoutUser
	, refreshUser: refreshUser
	, currentUser: currentUser
};
