
/**
 * get-form-data.js
 *
 * Serialize form data and build fetch opts
 */

var serialize = require('form-serialize');
var doc = document;

/**
 * FormData api alternative
 *
 * @oaram   Object  app   App instance
 * @oaram   Object  data  Event data
 * @return  Object
 */
module.exports = function getFormData (app, data) {
	// process form
	var form = doc.getElementById(data.id);
	var body_raw = serialize(form, { hash: true });
	var body_str = serialize(form);

	// cache form and return fetch options
	app.modify(['ui', 'field_data'], body_raw || {});
	return {
		body: body_str
		, headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};
};
