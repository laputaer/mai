
/**
 * ranking.js
 *
 * Template for ranking page
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
		title: 'section.titles.hot-clubs'
		, key: 'hot-clubs'
	});

	var section_title_2 = sectionTitleTemplate({
		title: 'section.titles.top-clubs'
		, key: 'top-clubs'
		, top: true
	});

	var section_title_3 = sectionTitleTemplate({
		title: 'section.titles.recent-clubs'
		, key: 'recent-clubs'
		, top: true
	});

	var hot_clubs = data.hot_clubs;
	var top_clubs = data.top_clubs;
	var recent_clubs = data.recent_clubs;

	hot_clubs = hot_clubs.map(function(club) {
		return clubTemplate(club);
	});

	top_clubs = top_clubs.map(function(club) {
		return clubTemplate(club);
	});

	recent_clubs = recent_clubs.map(function(club) {
		return clubTemplate(club);
	});

	var clubOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var ranking = $('div', clubOpts, [
		section_title_1
		, hot_clubs
		, section_title_2
		, top_clubs
		, section_title_3
		, recent_clubs
	]);

	return ranking;
};
