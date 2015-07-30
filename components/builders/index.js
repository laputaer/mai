
/**
 * index.js
 *
 * Centralized template builder
 */

var extend = require('xtend');

var builders = require('./builders');
var createRoute = require('../helpers/create-named-route');

var routes = {
	// new routes
	home: createRoute('^/$')
	, myClubs: createRoute('^/my-clubs$')
	, clubProfile: createRoute('^/c/:slug$')
	// old routes
	, help: createRoute('^/help$')
	, login: createRoute('^/login/redirect$')
	, userProfile: createRoute('^/u/:uid$')
	, club: createRoute('^/c/club-home$')
	, clubRanking: createRoute('^/c/club-ranking$')
	, clubSearch: createRoute('^/c/club-search$')
	, clubNew: createRoute('^/c/club-add$')
	, clubEditor: createRoute('^/c/:slug/edit$')
	, clubAddPostForm: createRoute('^/c/:slug/p/post-add$')
	, clubAddConfirmForm: createRoute('^/c/:slug/p/post-add-2$')
};

module.exports = builder;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function builder(data) {
	var path = data.current_path;
	var partials;

	for (var route in routes) {
		if (!routes.hasOwnProperty(route)) {
			continue;
		}

		if (!routes[route].test(path)) {
			continue;
		}

		partials = builders[route](data);
		break;
	}

	var main = extend(data, partials);
	return builders.doc(main);
};
