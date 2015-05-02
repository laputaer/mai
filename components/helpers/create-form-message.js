
/**
 * create-form-message.js
 *
 * Create an error for custom form response
 */

module.exports = helper;

/**
 * Generate a standard error object
 *
 * @param   Object  body     Input body
 * @param   String  message  I18N message string
 * @param   Mixed   errors   List of names or validation errors
 * @return  Object           Internal error object
 */
function helper(body, message, errors) {
	body = body || {};
	message = message || '';
	errors = errors || [];

	var err = new Error();
	err.message = message;
	err.body = body;

	if (errors instanceof Array) {
		err.attrs = errors;
	} else {
		err.attrs = [];
		for (var prop in errors) {
			if (errors.hasOwnProperty(prop) && errors[prop].length > 0) {
				err.attrs.push(prop);
			}
		}
	}

	return err;
};
