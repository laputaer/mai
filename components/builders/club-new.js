
/**
 * club.js
 *
 * Render club page body
 */

var containerTemplate = require('../templates/club/container');
var clubCreationFormTemplate = require('../templates/club/club-creation-form');
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
	data.club_form = clubCreationFormTemplate(data);
	data.club_form_error = formErrorTemplate(data);
	data.main = containerTemplate(data);

	return bodyBuilder(data);
};
