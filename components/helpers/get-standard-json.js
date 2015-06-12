
/**
 * get-standard-json.js
 *
 * Generate a standard json object response
 */

module.exports = helper;

/**
 * Helper
 *
 * @param   Object  data     Response data
 * @param   Number  code     Status code
 * @param   String  message  Error message
 * @return  Object           JSON output
 */
function helper(data, code, message) {
	if (!data) {
		code = code || 404;
	} else {
		code = code || 200;
	}

	var output = {
		ok: code >= 200 && code < 300
		, code: code
		, message: message || ''
		, data: data || {}
	};

	return output;
};
