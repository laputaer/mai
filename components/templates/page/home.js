
/**
 * home.js
 *
 * Template for home page
 */

var I = require('icepick');

var $ = require('../vdom');
var i18n = require('../i18n')();
var emitter = require('../emitter');

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
	});

	var featured_clubs = data.featured_clubs;
	var featured_posts = data.featured_posts;

	if (!data.ui.load_post) {
		featured_posts = featured_posts.slice(0, 3);
	}

	var featured_clubs = featured_clubs.map(function(club, i) {
		club = I.assoc(club, 'num', i);
		return clubTemplate(club);
	});

	var featured_posts = featured_posts.map(function(post, i) {
		post = I.assoc(post, 'num', i);
		post = I.assoc(post, 'version', data.version.asset);
		return postTemplate(post);
	});

	var load_more = loadButtonTemplate({
		title: 'section.load.featured-post'
		, key: 'load-button'
		, image: '/images/load-bg-400.jpg'
		, base_url: data.base_url
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:load:post')
	});

	var home = $('div.page-content', [
		section_title_1
		, featured_clubs
		, section_title_2
		, featured_posts
		, load_more
	]);

	return home;
};
