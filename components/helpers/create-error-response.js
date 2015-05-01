
/**
 * create-error-response.js
 *
 * Create an error for custom error page
 */

module.exports = helper;

/**
 * Generate a standard error object
 *
 * @param   Number  status   Error status code
 * @param   String  message  I18N message string
 * @return  Object           Internal error object
 */
function helper(status, message) {
	var error = new Error(message);
	error.status = status;

	return error;
};
