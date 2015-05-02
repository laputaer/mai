
/**
 * club-editor.js
 *
 * Render a club manamgement form
 */

var editorFormTemplate = require('../templates/club/editor-form');
var formErrorTemplate = require('../templates/common/form-error');
var csrfFieldTemplate = require('../templates/common/csrf-field');

var bodyBuilder = require('./body');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	data.csrf_field = csrfFieldTemplate({ csrf_token: data.current_user.csrf_token });
	data.club_form_error = formErrorTemplate(data);
	data.main = editorFormTemplate(data);

	return bodyBuilder(data);
};
