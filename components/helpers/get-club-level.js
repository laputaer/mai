
/**
 * get-club-level.js
 *
 * Provide user oauth profile link
 */

module.exports = helper;

/**
 * Helper
 *
 * @param   Number  count  Club member count
 * @return  Number
 */
function helper(count) {
	if (count < 5) {
		return 0;
	} else if (count < 10) {
		return 1;
	} else if (count < 20) {
		return 2;
	} else if (count < 50) {
		return 3;
	} else if (count < 100) {
		return 4;
	} else if (count < 200) {
		return 5;
	} else if (count < 500) {
		return 6;
	} else if (count < 1000) {
		return 7;
	} else {
		return 8;
	}

	return 0;
};
