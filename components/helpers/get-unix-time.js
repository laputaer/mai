
/**
 * get-unix-time.js
 *
 * Get unix time in seconds
 */

module.exports = helper;

/**
 * Helper
 *
 * @return  Number
 */
function helper() {
	return Math.round(Date.now() / 1000);
};
