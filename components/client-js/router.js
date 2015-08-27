
/**
 * router.js
 *
 * Centralized route matcher
 */

'use strict';

var Path = require('path-parser');

// route matching
var routes = {
	home: new Path('/')
	, myClubs: new Path('/my-clubs')
	, clubProfile: new Path('/c/:slug')
	, userProfile: new Path('/u/:uid')
	, ranking: new Path('/ranking')
	, help: new Path('/help')
};

module.exports = router;

/**
 * Get the proper route name
 *
 * @param   Object  data  From data source
 * @return  Object        Matched route
 */
function router(data) {
	var path = data.current_path + data.current_query;
	var result;

	for (var route in routes) {
		if (!routes.hasOwnProperty(route)) {
			continue;
		}

		var res = routes[route].match(path);
		if (!res) {
			continue;
		}

		result = { name: route, params: res };
		break;
	}

	return result;
};
