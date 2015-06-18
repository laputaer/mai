
/**
 * index.js
 *
 * Group template together for client-side rendering
 */

module.exports = {
	doc: require('./doc')
	, head: require('./head')
	, body: require('./body')
	, main: require('./main')
	, common: require('./common/index')
	, user: require('./user/index')
	, club: require('./club/index')
	, page: require('./page/index')
};
