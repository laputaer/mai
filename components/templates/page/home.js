
/**
 * home.js
 *
 * Template for home page
 */

var $ = require('../vdom');
var emitter = require('../emitter');
var immutable = require('../immutable');

var clubTemplate = require('../common/featured-club');
var postTemplate = require('../common/featured-post');
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
		title: 'section.titles.featured-clubs'
		, key: 'featured-clubs'
	});

	var section_title_2 = sectionTitleTemplate({
		title: 'section.titles.featured-posts'
		, key: 'featured-posts'
		, top: true
		, bottom: true
	});

	var featured_clubs = data.featured_clubs;
	var featured_posts = data.featured_posts;

	if (!data.ui.load_post) {
		featured_posts = featured_posts.slice(0, 8);
	} else if (data.ui.load_post > 0) {
		featured_posts = featured_posts.slice(0, data.ui.load_post);
	}

	featured_clubs = featured_clubs.map(function(club, i) {
		return clubTemplate(club);
	});

	featured_posts = featured_posts.map(function(post, i) {
		var opts = {
			'num': i
			, 'version': data.version.asset
			, 'view': 'featured_posts'
			, 'client': data.client
		};

		return immutable(postTemplate, post, opts);
	});

	var load_more = loadButtonTemplate({
		title: 'section.load.featured-posts'
		, key: 'load-button'
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:load:featured-post')
	});

	var homeOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var home = $('div', homeOpts, [
		section_title_1
		, featured_clubs
		, section_title_2
		, featured_posts
		, load_more
	]);

	return home;
};
