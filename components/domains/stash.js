
/**
 * stash.js
 *
 * Export stash domain model
 */

var createItem = require('./stash/create-item');
var deleteItem = require('./stash/delete-item');
var getUserItems = require('./stash/get-user-items');
var matchItem = require('./stash/match-item');

module.exports = {
	createItem: createItem
	, deleteItem: deleteItem
	, getUserItems: getUserItems
	, matchItem: matchItem
};
