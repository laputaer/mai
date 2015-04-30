
/**
 * get-cool-initials.js
 *
 * For use in place of avatar
 */

module.exports = helper;

/**
 * Helper
 *
 * @param   String  input
 * @return  String
 */
function helper(input) {
	var names = input.split(/ |-|_/);
	if (names.length === 2) {
		return names[0].substr(0, 1) + names[1].substr(0, 1);
	} else {
		return names[0].substr(0, 2);
	}
};
