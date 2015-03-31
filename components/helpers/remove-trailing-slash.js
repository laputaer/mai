
/**
 * remove-trailing-slash.js
 *
 * For removing extra slashes at the end of path
 */

module.exports = helper;

/**
 * Helper
 *
 * @param   String  path  location.path or server equivalent
 * @return  String
 */
function helper(path) {
	return path.replace(/\/+$/, '');
};
