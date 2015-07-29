
/**
 * my-clubs.js
 *
 * Template for my clubs page
 */

var $ = require('../vdom');

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
		title: 'section.titles.owner-clubs'
		, key: 'owner-clubs'
	});

	var section_title_2 = sectionTitleTemplate({
		title: 'section.titles.joined-clubs'
		, key: 'joined-posts'
		, top: true
	});

	var my_clubs = data.my_clubs;
	var joined_clubs = data.joined_clubs;

	my_clubs = my_clubs.map(function(club) {
		return clubTemplate(club);
	});

	joined_clubs = joined_clubs.map(function(club) {
		return clubTemplate(club);
	});

	var clubOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var club = $('div', clubOpts, [
		section_title_1
		, my_clubs
		, section_title_2
		, joined_clubs
	]);

	return club;
};
