
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
	// multi-step form support
	var step = app.read(['ui', 'form_step']) || 0;

	// invalid form data
	if (!json.ok) {
		app.modify(['ui', 'form_error'], json.message || '');
		app.modify(['ui', 'field_error'], json.data || {});
		app.modify(['ui', 'form_data'], null);
		app.modify(['ui', 'form_step'], step);
		app.refresh();
		return;
	}

	// valid form data, next step
	app.modify(['ui', 'form_error'], '');
	app.modify(['ui', 'field_error'], {});
	app.modify(['ui', 'form_data'], json.data || {});
	app.modify(['ui', 'form_step'], step + 1);
	app.refresh();
};
