
/**
 * create-custom-error.js
 *
 * Convert validation error into internal error object
 */

module.exports = helper;

/**
 * Generate a standard error object
 *
 * @param   Object  attrs  Validation result
 * @param   Object  body   Original input
 * @return  Object         Internal error object
 */
function helper(attrs, body) {
	var error = {};
	var list = [];

	for (var prop in attrs) {
		if (attrs.hasOwnProperty(prop) && attrs[prop].length > 0) {
			list.push(prop);
		}
	}

	error.type = 'form';
	error.message = 'error.form-input-invalid';
	error.messageData = {};
	error.attrs = list;
	error.body = body || {};

	return error;
};
