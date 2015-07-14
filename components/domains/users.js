
/**
 * users.js
 *
 * Export users domain model
 */

var matchUser = require('./users/match-user');
var createUser = require('./users/create-user');
var updateUser = require('./users/update-user');
var getUsersByIds = require('./users/get-users-by-ids');

module.exports = {
	matchUser: matchUser
	, createUser: createUser
	, updateUser: updateUser
	, getUsersByIds: getUsersByIds
};
