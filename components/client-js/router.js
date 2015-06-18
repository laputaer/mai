
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
};

module.exports = router;

/**
 * Get the proper route name
 *
 * @param   Object  data  From data source
 * @return  String        Route name
 */
function router(data) {
	// similar to builders/index but only retrieve named routes
	var path = data.current_path;
	var name;

	for (var route in routes) {
		if (!routes.hasOwnProperty(route)) {
			continue;
		}

		if (!routes[route].test(path)) {
			continue;
		}

		name = route;
		break;
	}

	return name;
};
