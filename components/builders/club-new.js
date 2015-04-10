
/**
 * club.js
 *
 * Render club page body
 */

var containerTemplate = require('../templates/club/container');
var clubCreationFormTemplate = require('../templates/club/club-creation-form');
var formErrorTemplate = require('../templates/common/form-error');

var bodyBuilder = require('./body');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	data.club_form = clubCreationFormTemplate(data);
	if (data.flash.type === 'form') {
		data.club_form_error = formErrorTemplate(data);
	}
	data.main = containerTemplate(data);

	return bodyBuilder(data);
};
