
/**
 * index.js
 *
 * Group handlers together for router
 */

module.exports = {
	globalConfig: require('./global-config')
	, featuredClubs: require('./featured-clubs')
	, featuredPosts: require('./featured-posts')
	, favoritePost: require('./favorite-post')
	, unfavoritePost: require('./unfavorite-post')
	, userJoinedClubs: require('./current-user-joined-clubs')
	, userOwnedClubs: require('./current-user-owned-clubs')
	, clubPosts: require('./club-posts')
	, clubProfile: require('./club-profile')
	, userPosts: require('./user-posts')
	, userProfile: require('./user-profile')
	, topClubs: require('./top-clubs')
	, hotClubs: require('./hot-clubs')
	, recentClubs: require('./recent-clubs')
	, createClub: require('./create-club')
	, manageClub: require('./manage-club')
	, initPost: require('./init-post')
	, createPost: require('./create-post')
	, joinClub: require('./join-club')
	, leaveClub: require('./leave-club')
	, recentPosts: require('./recent-posts')
	, createStashItem: require('./create-stash-item')
};
