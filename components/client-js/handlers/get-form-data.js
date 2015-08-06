
/**
 * get-form-data.js
 *
 * Serialize form data and build fetch opts
 */

var serialize = require('form-serialize');

/**
 * FormData api alternative
 *
 * @oaram   Object  app   App instance
 * @oaram   Object  form  Form element
 * @return  String
 */
module.exports = function getFormData (app, form) {
	// process form
	var body_raw = serialize(form, { hash: true });
	var body_str = serialize(form);

	// cache form and return fetch options
	app.modify(['ui', 'field_data'], body_raw || {});
	return body_str;
};
