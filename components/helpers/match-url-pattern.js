
/**
 * match-url-pattern.js
 *
 * Given pattern, perform string scanning and return matched result
 */

module.exports = helper;

/**
 * Helper
 *
 * @param   String  host   Input domain
 * @param   Object  table  Matching domain
 * @return  Mixed
 */
function helper(host, table) {
	var result;

	for (var prop in table) {
		if (table.hasOwnProperty(prop)) {
			if (host.indexOf(prop) > -1) {
				result = table[prop];
				break;
			}
		}
	}

	return result;
};
