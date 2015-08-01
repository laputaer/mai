
/**
 * club-profile.js
 *
 * Template for club profile page
 */

var $ = require('../vdom');
var emitter = require('../emitter');
var immutable = require('../immutable');

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
		title: 'section.titles.recent-posts'
		, key: 'recent-posts'
		, bottom: true
	});

	var club_posts = data.club_posts;

	if (!data.ui.load_post) {
		club_posts = club_posts.slice(0, 8);
	} else if (data.ui.load_post > 0) {
		club_posts = club_posts.slice(0, data.ui.load_post);
	}

	club_posts = club_posts.map(function(post, i) {
		var opts = {
			num: i
			, version: data.version.asset
			, view: 'club_posts'
			, client: data.client
			, count: data.ui.load_post
		};

		return immutable(postTemplate, post, opts);
	});

	var load_more = loadButtonTemplate({
		title: 'section.load.club-posts'
		, key: 'load-button'
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:load:club-posts')
	});

	var homeOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var home = $('div', homeOpts, [
		section_title_1
		, club_posts
		, load_more
	]);

	return home;
};
