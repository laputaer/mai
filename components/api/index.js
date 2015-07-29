
/**
 * index.js
 *
 * Group handlers together for router
 */

module.exports = {
	getGlobalConfig: require('./global-config')
	, getFeaturedClubs: require('./featured-clubs')
	, getFeaturedPosts: require('./featured-posts')
	, favoritePost: require('./favorite-post')
	, unfavoritePost: require('./unfavorite-post')
	, userJoinedClubs: require('./current-user-joined-clubs')
	, userOwnedClubs: require('./current-user-owned-clubs')
};
