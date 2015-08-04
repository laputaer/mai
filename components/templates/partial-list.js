
/**
 * partial-list.js
 *
 * A helper that return a slice of all items
 */

module.exports = helper;

/**
 * Template defines html structure
 *
 * @param   Array   list   A list of items
 * @param   Number  init   Default number of items
 * @param   Number  count  How much to slice
 * @return  Array
 */
function helper(list, init, count) {
	if (!count) {
		return list.slice(0, init);
	} else if (count > 0) {
		return list.slice(0, count);
	}

	return [];
};
