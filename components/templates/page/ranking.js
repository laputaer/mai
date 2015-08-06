
/**
 * ranking.js
 *
 * Template for ranking page
 */

var $ = require('../vdom');
var emitter = require('../emitter');
var immutable = require('../immutable');
var partialList = require('../partial-list');

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
	// common data
	var hot_clubs = data.hot_clubs;
	var top_clubs = data.top_clubs;
	var recent_clubs = data.recent_clubs;
	var ui = data.ui;
	var client = data.client;

	// 1st section, plain title
	var hot_clubs_title = sectionTitleTemplate({
		title: 'section.titles.hot-clubs'
		, key: 'hot-clubs'
	});

	// trick to hide loaded post, so 1st load more is always fast
	hot_clubs = partialList(hot_clubs, 8, ui['load-hot-clubs']);

	// render clubs, use immutable
	var hot_clubs_list = hot_clubs.map(function (club) {
		var opts = {
			client: client
			, cache: ui['load-hot-clubs'] > 50
			, prefix: 'hot-club'
		};

		return immutable(clubTemplate, club, opts);
	});

	// load more button
	var hot_clubs_count = hot_clubs_list.length;
	var hot_clubs_button;
	if (!ui['load-hot-clubs'] || hot_clubs_count >= ui['load-hot-clubs']) {
		hot_clubs_button = loadButtonTemplate({
			title: 'section.load.hot-clubs'
			, key: 'load-hot-clubs'
			, eventName: 'page:load:hot-clubs'
		});
	} else {
		hot_clubs_button = loadButtonTemplate({
			title: 'section.load.eof-2'
			, key: 'load-hot-clubs'
		});
	}

	// 2nd section, plain title
	var top_clubs_title = sectionTitleTemplate({
		title: 'section.titles.top-clubs'
		, key: 'top-clubs'
		, top: true
	});

	// same trick as section 1
	top_clubs = partialList(top_clubs, 8, ui['load-top-clubs']);

	var top_clubs_list = top_clubs.map(function (club) {
		var opts = {
			client: client
			, cache: ui['load-top-clubs'] > 50
			, prefix: 'top-club'
		};

		return immutable(clubTemplate, club, opts);
	});

	var top_clubs_count = top_clubs_list.length;
	var top_clubs_button;
	if (!ui['load-top-clubs'] || top_clubs_count >= ui['load-top-clubs']) {
		top_clubs_button = loadButtonTemplate({
			title: 'section.load.top-clubs'
			, key: 'load-top-clubs'
			, eventName: 'page:load:top-clubs'
		});
	} else {
		top_clubs_button = loadButtonTemplate({
			title: 'section.load.eof-2'
			, key: 'load-top-clubs'
		});
	}

	// 3rd section, plain title
	var recent_clubs_title = sectionTitleTemplate({
		title: 'section.titles.recent-clubs'
		, key: 'recent-clubs'
		, top: true
	});

	// same trick as section 1
	recent_clubs = partialList(recent_clubs, 8, ui['load-recent-clubs']);

	var recent_clubs_list = recent_clubs.map(function (club) {
		var opts = {
			client: client
			, cache: ui['load-recent-clubs'] > 50
			, prefix: 'recent-club'
		};

		return immutable(clubTemplate, club, opts);
	});

	var recent_clubs_button = loadButtonTemplate({
		title: 'section.load.recent-clubs'
		, key: 'load-recent-clubs'
		, eventName: 'page:load:recent-clubs'
	});

	var recent_clubs_count = recent_clubs_list.length;
	var recent_clubs_button;
	if (!ui['load-recent-clubs'] || recent_clubs_count >= ui['load-recent-clubs']) {
		recent_clubs_button = loadButtonTemplate({
			title: 'section.load.recent-clubs'
			, key: 'load-recent-clubs'
			, eventName: 'page:load:recent-clubs'
		});
	} else {
		recent_clubs_button = loadButtonTemplate({
			title: 'section.load.eof-2'
			, key: 'load-recent-clubs'
		});
	}

	// page content
	var clubOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var ranking = $('div', clubOpts, [
		hot_clubs_title
		, hot_clubs_list
		, hot_clubs_button
		, top_clubs_title
		, top_clubs_list
		, top_clubs_button
		, recent_clubs_title
		, recent_clubs_list
		, recent_clubs_button
	]);

	return ranking;
};
