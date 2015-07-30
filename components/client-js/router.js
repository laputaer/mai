
/**
 * router.js
 *
 * Centralized route matcher
 */

// helpers
var createRoute = require('../helpers/create-named-route');

// route matching
var routes = {
	home: createRoute('^/$')
	, help: createRoute('^/help$')
	, myClubs: createRoute('^/my-clubs$')
	, clubProfile: createRoute('^/c/:slug$')
};

module.exports = router;

/**
 * Get the proper route name
 *
 * @param   Object  data  From data source
 * @return  Object        Matched route
 */
function router(data) {
	var path = data.current_path;
	var result;

	for (var route in routes) {
		if (!routes.hasOwnProperty(route)) {
			continue;
		}

		if (!routes[route].test(path)) {
			continue;
		}

		var matches = routes[route].exec(path);
		var params = [];

		for (var prop in matches) {
			if (!matches.hasOwnProperty(prop)) {
				continue;
			}

			if (prop > 0 && prop < 5) {
				params[prop] = matches[prop];
			}
		}

		params = params.filter(function(value) {
			return !!value;
		});

		result = {
			name: route
			, params: params
		}
		break;
	}

	return result;
};
