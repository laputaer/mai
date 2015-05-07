
/**
 * create-form-message.js
 *
 * Create an error for custom form response
 */

module.exports = helper;

/**
 * Generate a standard error object
 *
 * @param   String  message  I18N message string
 * @param   Object  body     Input body
 * @param   Mixed   errors   List of names or validation errors
 * @return  Object           Internal error object
 */
function helper(message, body, errors) {
	message = message || '';
	body = body || {};
	errors = errors || [];

	var err = new Error();
	err.message = message;
	err.body = body;
	err.attrs = [];

	if (errors instanceof Array) {
		err.attrs = errors;
	} else {
		for (var prop in errors) {
			if (errors.hasOwnProperty(prop) && errors[prop].length > 0) {
				err.attrs.push(prop);
			}
		}
	}

	return err;
};
