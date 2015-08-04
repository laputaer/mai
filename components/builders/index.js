
/**
 * index.js
 *
 * Centralized template builder
 */

var extend = require('xtend');

var builders = require('./builders');
var createRoute = require('../helpers/create-named-route');

var routes = {
	home: createRoute('^/$')
	, myClubs: createRoute('^/my-clubs$')
	, clubProfile: createRoute('^/c/:slug$')
	, userProfile: createRoute('^/u/:uid$')
	, ranking: createRoute('^/ranking$')
	, help: createRoute('^/help$')
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
