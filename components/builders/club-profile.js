
/**
 * club-profile.js
 *
 * Render club profile body
 */

var containerTemplate = require('../templates/user/container');

var bodyBuilder = require('./body');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	return bodyBuilder(data);
};
