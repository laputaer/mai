
/**
 * home.js
 *
 * Template for home page
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

var clubTemplate = require('../common/featured-club');
var sectionTitleTemplate = require('../common/section-title');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var section_title_1 = sectionTitleTemplate({
		title: 'section.titles.featured-clubs'
	});

	var featured_clubs = data.featured_clubs.map(function(club, i) {
		club.num = i;
		return clubTemplate(club);
	});

	var home = $('div.page-content', [
		section_title_1
		, featured_clubs
	]);

	return home;
};