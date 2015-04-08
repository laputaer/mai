
/**
 * club.js
 *
 * Render club page body
 */

var containerTemplate = require('../templates/club/container');
var clubCreationFormTemplate = require('../templates/club/club-creation-form');

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
	data.main = containerTemplate(data);

	return bodyBuilder(data);
};
