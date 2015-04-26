
/**
 * get-variable-type.js
 *
 * Get variable datatype
 */

module.exports = helper;

/**
 * Helper
 *
 * @param   Mixed   input
 * @return  String
 */
function helper(input) {
	return Object.prototype.toString.call(input).slice(8, -1);
};
