
/**
 * social.js
 *
 * Export social domain model
 */

var createFavoritePost = require('./social/create-favorite-post');
var removeFavoritePost = require('./social/remove-favorite-post');
var matchFavoritePost = require('./social/match-favorite-post');

module.exports = {
	createFavoritePost: createFavoritePost
	, removeFavoritePost: removeFavoritePost
	, matchFavoritePost: matchFavoritePost
};
