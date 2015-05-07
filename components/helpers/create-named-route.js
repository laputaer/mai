
/**
 * create-named-route.js
 *
 * Create a regex for named route matching
 */

module.exports = helper;

/**
 * Helper
 *
 * @param   String  route
 * @return  Regex
 */
function helper(route) {
	return new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'));
};
