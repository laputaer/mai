
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
 * @param   Boolean  flag   Return simple boolean or array of attributes
 * @return  Mixed
 */
function helper(input, attrs, flag) {
	var result = flag ? [] : true;

	if (!input) {
		return flag ? attrs : false;
	}

	attrs.forEach(function(attr) {
		if (input.hasOwnProperty(attr)) {
			return;
		}

		if (flag) {
			result.push(attr);
		} else {
			result = false;
		}
	});

	return result;
};
