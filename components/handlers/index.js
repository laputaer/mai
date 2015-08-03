
/**
 * index.js
 *
 * Group handlers together for router
 */

module.exports = {
	// new route
	pageLanding: require('./page-home')
	, pageMyClubs: require('./page-my-clubs')
	, pageHelp: require('./page-help')
	, pageClubProfile: require('./page-club-profile')
	, pageUserProfile: require('./page-user-profile')
	, pageRanking: require('./page-ranking')
	, pageLogin: require('./page-login')
	// old route
	, clubsFilterUser: require('./club')
	, clubsFilterRanking: require('./club-ranking')
	, clubsFilterSearch: require('./club-search')
	, clubAddForm: require('./club-add')
	, club: require('./club-home')
	, clubEditForm: require('./club-edit')
	, clubCreate: require('./club-create')
	, clubUpdate: require('./club-update')
	, clubUserMembership: require('./club-membership')
	, clubPosts: require('./page-placeholder')
	, clubPostAddForm: require('./club-post-add')
	, clubPostConfirmForm: require('./club-post-confirm')
	, clubPost: require('./page-placeholder')
	, clubPostEditForm: require('./page-placeholder')
	, clubPostStart: require('./club-post-start')
	, clubPostCreate: require('./club-post-create')
	, clubPostUpdate: require('./page-placeholder')
};
