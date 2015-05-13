
/**
 * index.js
 *
 * Centralized template builder
 */

var builders = require('./builders');
var createRoute = require('../helpers/create-named-route');

var routes = {
	clubNew: createRoute('/c/club-add')
	, clubEditor: createRoute('/c/:slug/edit')
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
