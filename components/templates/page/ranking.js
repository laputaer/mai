
/**
 * ranking.js
 *
 * Template for ranking page
 */

var $ = require('../vdom');
var emitter = require('../emitter');
var immutable = require('../immutable');

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

	if (!data.ui.load_hot_clubs) {
		hot_clubs = hot_clubs.slice(0, 10);
	} else if (data.ui.load_hot_clubs > 0) {
		hot_clubs = hot_clubs.slice(0, data.ui.load_hot_clubs);
	}

	if (!data.ui.load_top_clubs) {
		top_clubs = top_clubs.slice(0, 10);
	} else if (data.ui.load_top_clubs > 0) {
		top_clubs = top_clubs.slice(0, data.ui.load_top_clubs);
	}

	if (!data.ui.load_recent_clubs) {
		recent_clubs = recent_clubs.slice(0, 10);
	} else if (data.ui.load_recent_clubs > 0) {
		recent_clubs = recent_clubs.slice(0, data.ui.load_recent_clubs);
	}

	hot_clubs = hot_clubs.map(function(club) {
		var opts = {
			client: data.client
			, count: data.ui.load_hot_clubs
			, prefix: 'hot-club'
		};

		return immutable(clubTemplate, club, opts);
	});

	top_clubs = top_clubs.map(function(club) {
		var opts = {
			client: data.client
			, count: data.ui.load_top_clubs
			, prefix: 'top-club'
		};

		return immutable(clubTemplate, club, opts);
	});

	recent_clubs = recent_clubs.map(function(club) {
		var opts = {
			client: data.client
			, count: data.ui.load_recent_clubs
			, prefix: 'recent-club'
		};

		return immutable(clubTemplate, club, opts);
	});

	var load_hot_clubs_button = loadButtonTemplate({
		title: 'section.load.hot-clubs'
		, key: 'load-hot-clubs'
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:load:hot-clubs')
	});

	var load_top_clubs_button = loadButtonTemplate({
		title: 'section.load.top-clubs'
		, key: 'load-top-clubs'
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:load:top-clubs')
	});

	var load_recent_clubs_button = loadButtonTemplate({
		title: 'section.load.recent-clubs'
		, key: 'load-recent-clubs'
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:load:recent-clubs')
	});

	var clubOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var ranking = $('div', clubOpts, [
		section_title_1
		, hot_clubs
		, load_hot_clubs_button
		, section_title_2
		, top_clubs
		, load_top_clubs_button
		, section_title_3
		, recent_clubs
		, load_recent_clubs_button
	]);

	return ranking;
};
