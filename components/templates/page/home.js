
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

	var featured_clubs = data.featured_clubs.map(function(club, i) {
		club.num = i;
		return clubTemplate(club);
	});

	var featured_posts = data.featured_posts.map(function(post, i) {
		post.num = i;
		return postTemplate(post);
	});

	var home = $('div.page-content', [
		section_title_1
		, featured_clubs
		, section_title_2
		, featured_posts
	]);

	return home;
};