
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
var getCsrfToken = require('./session/get-csrf-token');
var verifyCsrfToken = require('./session/verify-csrf-token');
var getOpenGraphCache = require('./session/get-opengraph-cache');
var setOpenGraphCache = require('./session/set-opengraph-cache');
var clearOpenGraphCache = require('./session/clear-opengraph-cache');

module.exports = {
	loginUser: loginUser
	, logoutUser: logoutUser
	, refreshUser: refreshUser
	, currentUser: currentUser
	, getOauthResponse: getOauthResponse
	, clearOauthResponse: clearOauthResponse
	, getCsrfToken: getCsrfToken
	, verifyCsrfToken: verifyCsrfToken
	, getOpenGraphCache: getOpenGraphCache
	, setOpenGraphCache: setOpenGraphCache
	, clearOpenGraphCache: clearOpenGraphCache
};
