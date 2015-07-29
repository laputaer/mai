
/**
 * my-clubs.js
 *
 * Template for my clubs page
 */

var $ = require('../vdom');
var emitter = require('../emitter');

var clubTemplate = require('../common/featured-club');
var sectionTitleTemplate = require('../common/section-title');
var loadButtonTemplate = require('../common/load-button');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var section_title_1 = sectionTitleTemplate({
		title: 'section.titles.my-clubs'
		, key: 'my-clubs'
	});

	var section_title_2 = sectionTitleTemplate({
		title: 'section.titles.joined-clubs'
		, key: 'joined-clubs'
		, top: true
	});

	var my_clubs = data.my_clubs;
	var joined_clubs = data.joined_clubs;

	if (!data.ui.load_my_clubs) {
		my_clubs = my_clubs.slice(0, 10);
	} else if (data.ui.load_my_clubs > 0) {
		my_clubs = my_clubs.slice(0, data.ui.load_my_clubs);
	}

	if (!data.ui.load_joined_clubs) {
		joined_clubs = joined_clubs.slice(0, 10);
	} else if (data.ui.load_joined_clubs > 0) {
		joined_clubs = joined_clubs.slice(0, data.ui.load_joined_clubs);
	}

	my_clubs = my_clubs.map(function(club) {
		return clubTemplate(club);
	});

	joined_clubs = joined_clubs.map(function(club) {
		return clubTemplate(club);
	});

	var load_my_clubs_button = loadButtonTemplate({
		title: 'section.load.my-clubs'
		, key: 'load-my-clubs'
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:load:my-clubs')
	});

	var load_joined_clubs_button = loadButtonTemplate({
		title: 'section.load.joined-clubs'
		, key: 'load-joined-clubs'
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:load:joined-clubs')
	});

	var clubOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var club = $('div', clubOpts, [
		section_title_1
		, my_clubs
		, load_my_clubs_button
		, section_title_2
		, joined_clubs
		, load_joined_clubs_button
	]);

	return club;
};
