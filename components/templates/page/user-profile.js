
/**
 * user-profile.js
 *
 * Template for user profile page
 */

var $ = require('../vdom');
var emitter = require('../emitter');
var immutable = require('../immutable');
var partialList = require('../partial-list');

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
	// common data
	var user_posts = data.user_posts;
	var ui = data.ui;
	var client = data.client;
	var version = data.version.asset;

	// 1st section, plain title
	var user_posts_title = sectionTitleTemplate({
		title: 'section.titles.recent-posts'
		, key: 'recent-posts'
		, bottom: true
	});

	// trick to hide loaded post, so 1st load more is always fast
	user_posts = partialList(user_posts, 8, ui['load-user-posts']);

	// render posts, use immutable
	var user_posts_list = user_posts.map(function(post, i) {
		var opts = {
			num: i
			, version: version
			, view: 'user_posts'
			, client: client
			, cache: ui['load-user-posts'] > 50
		};

		return immutable(postTemplate, post, opts);
	});

	// load more button
	var user_posts_count = user_posts_list.length;
	var user_posts_button;
	if (!ui['load-user-posts'] || user_posts_count >= ui['load-user-posts']) {
		user_posts_button = loadButtonTemplate({
			title: 'section.load.user-posts'
			, key: 'load-user-posts'
			, eventName: 'page:load:user-posts'
		});
	} else {
		user_posts_button = loadButtonTemplate({
			title: 'section.load.eof-2'
			, key: 'load-user-posts'
		});
	}

	// page content
	var homeOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var home = $('div', homeOpts, [
		user_posts_title
		, user_posts_list
		, user_posts_button
	]);

	return home;
};
