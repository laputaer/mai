
/**
 * index.js
 *
 * Group handlers together for router
 */

module.exports = {
	getCurrentUser: require('./current-user')
	, getGlobalConfig: require('./global-config')
	, getFeaturedClubs: require('./featured-clubs')
	, getFeaturedPosts: require('./featured-posts')
};
