
/**
 * get-query-object.js (deprecated)
 *
 * Simple query string parser
 */

module.exports = helper;

/**
 * Helper
 *
 * @param   String  query  Query string
 * @return  Object
 */
function helper(query) {
	query = query.substr(1) || '';

	var list = query.split('&');
	var output = {};

	list.forEach(function (item) {
		var kv = item.split('=');
		output[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]) || '';
	});

	return output;
};
