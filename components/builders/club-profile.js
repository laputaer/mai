
/**
 * club-profile.js
 *
 * Render club profile body
 */

var profileTemplate = require('../templates/club/profile');
var buttonTemplate = require('../templates/common/button');

var bodyBuilder = require('./body');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	data.main = profileTemplate(data);

	return bodyBuilder(data);
};
