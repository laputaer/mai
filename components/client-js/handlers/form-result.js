
/**
 * form-result.js
 *
 * Process json result from backend api
 */

/**
 * Handle form result
 *
 * @oaram   Object  app   App instance
 * @oaram   Object  json  Result data
 * @return  Object
 */
module.exports = function formResult (app, json) {
	// invalid form data
	if (!json.ok) {
		app.modify(['ui', 'form_error'], json.message || '');
		app.modify(['ui', 'field_error'], json.data || {});
		app.refresh();
		return;
	}

	// valid form data
	app.modify(['ui', 'form_error'], '');
	app.modify(['ui', 'field_error'], {});
	app.modify(['ui', 'form_data'], json.data || {});
	app.refresh();
};
