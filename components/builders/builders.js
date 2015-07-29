
/**
 * builders.js
 *
 * Available template builders
 */

module.exports = {
	// old builders
	clubAddConfirmForm: require('./club-add-confirm-form')
	, clubAddPostForm: require('./club-add-post-form')
	, clubEditor: require('./club-editor')
	, clubNew: require('./club-new')
	, clubProfile: require('./club-profile')
	, clubRanking: require('./club-ranking')
	, clubSearch: require('./club-search')
	, club: require('./club')
	, customError: require('./custom-error')
	, doc: require('./doc')
	, help: require('./help')
	, login: require('./login')
	, userProfile: require('./user-profile')
	// updated builders
	, home: require('./home')
	, myClubs: require('./my-clubs')
};
