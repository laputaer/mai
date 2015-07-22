
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
};
