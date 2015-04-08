
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
	// keep root path
	if (path === '/') {
		return path;
	}

	return path.replace(/\/+$/, '');
};
