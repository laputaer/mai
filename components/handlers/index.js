
/**
 * index.js
 *
 * Group handlers together for router
 */

module.exports = {
	pageLanding: require('./landing')
	, pageHelp: require('./landing')
	, loginRedirect: require('./login-redirect')
	, loginOauth: require('./oauth')
	, userProfile: require('./user-profile')
	, clubsFilterUser: require('./club')
	, clubsFilterRanking: require('./landing')
	, clubsFilterSearch: require('./club-search')
	, clubAddForm: require('./club-add')
	, club: require('./club-home')
	, clubEditForm: require('./club-edit')
	, clubCreate: require('./club-create')
	, clubUpdate: require('./club-update')
	, clubUserMembership: require('./club-membership')
	, clubPosts: require('./landing')
	, clubPostAddForm: require('./landing')
	, clubPost: require('./landing')
	, clubPostEditForm: require('./landing')
	, clubPostCreate: require('./landing')
	, clubPostUpdate: require('./landing')
};
