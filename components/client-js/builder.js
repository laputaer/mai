
/**
 * builder.js
 *
 * Centralized template builder
 */

// template bundle
var templates = require('../templates/index');

// builder files
var builders = {
	home: require('../builders/home')
};

// helpers
var createRoute = require('../helpers/create-named-route');

// route matching
var routes = {
	home: createRoute('^/$')
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

	return templates.body(data);
};
