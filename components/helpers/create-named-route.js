
/**
 * create-named-route.js (deprecated)
 *
 * Create a regex for named route matching
 */

module.exports = helper;

/**
 * Helper
 *
 * @param   String  route  Path
 * @return  Regex
 */
function helper(route) {
	// notice the double escape we use on the replacement
	return new RegExp(route.replace(/:[^\s\$/]+/g, '([\\w-]+)'));
};
