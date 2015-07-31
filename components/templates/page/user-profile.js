
/**
 * user-profile.js
 *
 * Template for user profile page
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

	var user_posts = data.user_posts;

	if (!data.ui.load_post) {
		user_posts = user_posts.slice(0, 8);
	} else if (data.ui.load_post > 0) {
		user_posts = user_posts.slice(0, data.ui.load_post);
	}

	user_posts = user_posts.map(function(post, i) {
		var opts = {
			'num': i
			, 'version': data.version.asset
			, 'view': 'user_posts'
			, 'client': data.client
			, 'count': data.ui.load_post
		};

		return immutable(postTemplate, post, opts);
	});

	var load_more = loadButtonTemplate({
		title: 'section.load.user-posts'
		, key: 'load-button'
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:load:user-posts')
	});

	var homeOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var home = $('div', homeOpts, [
		section_title_1
		, user_posts
		, load_more
	]);

	return home;
};
