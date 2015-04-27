
/**
 * sessions.js
 *
 * Export oauth domain model
 */

var loginUser = require('./session/login-user');
var logoutUser = require('./session/logout-user');
var refreshUser = require('./session/refresh-user');
var currentUser = require('./session/current-user');
var getOauthResponse = require('./session/get-oauth-response');
var clearOauthResponse = require('./session/clear-oauth-response');

module.exports = {
	loginUser: loginUser
	, logoutUser: logoutUser
	, refreshUser: refreshUser
	, currentUser: currentUser
	, getOauthResponse: getOauthResponse
	, clearOauthResponse: clearOauthResponse
};
