
/**
 * index.js
 *
 * Centralized template builder
 */

var extend = require('xtend');
var Path = require('path-parser');

var builders = require('./builders');

var routes = {
	home: new Path('/')
	, myClubs: new Path('/my-clubs')
	, clubProfile: new Path('/c/:slug')
	, userProfile: new Path('/u/:uid')
	, ranking: new Path('/ranking')
	, help: new Path('/help')
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

		if (!routes[route].match(path)) {
			continue;
		}

		partials = builders[route](data);
		break;
	}

	var main = extend(data, partials);
	return builders.doc(main);
};
