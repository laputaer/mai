
/**
 * index.js
 *
 * Centralized template builder
 */

var builders = require('./builders');
var createRoute = require('../helpers/create-named-route');

// TODO: use a route-matching module that doesn't rely on order of routes
var routes = {
	clubNew: createRoute('/c/club-add')
	, clubEditor: createRoute('/c/:slug/edit')
	, clubProfile: createRoute('/c/:slug')
	, placeholder: createRoute('/|/help|/c/club-ranking')
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

	for (var route in routes) {
		if (!routes.hasOwnProperty(route)) {
			continue;
		}

		if (!routes[route].test(path)) {
			continue;
		}

		data = builders[route](data);
		break;
	}

	data = builders.body(data);

	return builders.doc(data);
};
