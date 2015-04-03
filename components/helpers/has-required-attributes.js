
/**
 * has-required-attributes.js
 *
 * Ensure object contains required attributes
 */

module.exports = helper;

/**
 * Helper
 *
 * @param   Object   input  Target object
 * @param   Array    attrs  Attributes to check
 * @return  Mixed
 */
function helper(input, attrs) {
	var pass = true;

	if (!input) {
		return false;
	}

	attrs.forEach(function(attr) {
		if (!input.hasOwnProperty(attr)) {
			pass = false;
		}
	});

	return pass;
};
