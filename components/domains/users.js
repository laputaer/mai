
/**
 * users.js
 *
 * Export users domain model
 */

var matchUser = require('./users/match-user');
var createUser = require('./users/create-user');
var updateUser = require('./users/update-user');

module.exports = {
	matchUser: matchUser
	, createUser: createUser
	, updateUser: updateUser
};
