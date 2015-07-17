
/**
 * home.js
 *
 * Template for home page
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

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
	});

	var section_title_2 = sectionTitleTemplate({
		title: 'section.titles.featured-posts'
	});

	// TODO: avoid opts workaround
	var featured_clubs = data.featured_clubs.map(function(club, i) {
		var opts = {};
		opts.num = i;
		return clubTemplate(club, opts);
	});

	var featured_posts = data.featured_posts.map(function(post, i) {
		var opts = {};
		opts.num = i;
		opts.version = data.version.asset;
		return postTemplate(post, opts);
	});

	var load_more = loadButtonTemplate({
		title: 'section.load.featured-post'
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
