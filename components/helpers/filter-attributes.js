
/**
 * filter-attributes.js
 *
 * Ensure output object only contains given attributes
 */

module.exports = helper;

/**
 * Helper
 *
 * @param   Object  input  Raw object
 * @param   Array   attrs  Attributes to include
 * @return  Object
 */
function helper(input, attrs) {
	var result = {};

	attrs.forEach(function(attr) {
		if (!input.hasOwnProperty(attr)) {
			return;
		}

		result[attr] = input[attr];
	});

	return result;
};
