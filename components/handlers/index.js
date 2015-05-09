
/**
 * index.js
 *
 * Group handlers together for router
 */

module.exports = {
	clubAdd: require('./club-add')
	, clubCreate: require('./club-create')
	, clubEdit: require('./club-edit')
	, clubHome: require('./club-home')
	, clubMembership: require('./club-membership')
	, clubSearch: require('./club-search')
	, clubUpdate: require('./club-update')
	, club: require('./club')
	, landing: require('./landing')
	, loginRedirect: require('./login-redirect')
	, oauth: require('./oauth')
	, userProfile: require('./user-profile')
};
