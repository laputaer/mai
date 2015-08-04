
/**
 * index.js
 *
 * Group handlers together for router
 */

module.exports = {
	pageLanding: require('./page-home')
	, pageMyClubs: require('./page-my-clubs')
	, pageHelp: require('./page-help')
	, pageClubProfile: require('./page-club-profile')
	, pageUserProfile: require('./page-user-profile')
	, pageRanking: require('./page-ranking')
	, pageLogin: require('./page-login')
};
