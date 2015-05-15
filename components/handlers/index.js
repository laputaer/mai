
/**
 * index.js
 *
 * Group handlers together for router
 */

module.exports = {
	pageLanding: require('./page-placeholder')
	, pageHelp: require('./page-help')
	, loginRedirect: require('./login-redirect')
	, loginOauth: require('./oauth')
	, userProfile: require('./user-profile')
	, clubsFilterUser: require('./club')
	, clubsFilterRanking: require('./page-placeholder')
	, clubsFilterSearch: require('./club-search')
	, clubAddForm: require('./club-add')
	, club: require('./club-home')
	, clubEditForm: require('./club-edit')
	, clubCreate: require('./club-create')
	, clubUpdate: require('./club-update')
	, clubUserMembership: require('./club-membership')
	, clubPosts: require('./page-placeholder')
	, clubPostAddForm: require('./club-post-add')
	, clubPost: require('./page-placeholder')
	, clubPostEditForm: require('./page-placeholder')
	, clubPostCreate: require('./page-placeholder')
	, clubPostUpdate: require('./page-placeholder')
};
