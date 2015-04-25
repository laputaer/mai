
/**
 * create-form-error.js
 *
 * Create an internal error for form data
 */

module.exports = helper;

/**
 * Generate a standard error object
 *
 * @param   String  message  I18N message string
 * @param   Object  data     Message data for i18n
 * @param   Array   attrs    Field names
 * @param   Object  body     Original input
 * @return  Object           Internal error object
 */
function helper(message, data, attrs, body) {
	var error = {};

	error.type = 'form';
	error.message = message || 'error.form-input-invalid';
	error.messageData = data || {};
	error.attrs = attrs || [];
	error.body = body || {};

	return error;
};
