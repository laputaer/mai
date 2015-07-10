
/**
 * home.js
 *
 * Template for home page
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

var clubTemplate = require('../common/featured-club');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var featured_clubs = data.featured_clubs.map(function(club) {
		return clubTemplate(club);
	});

	var home = $('div.page-content', [
		featured_clubs
	]);

	return home;
};