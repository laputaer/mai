
/**
 * user-profile.js
 *
 * Template for user profile page
 */

var $ = require('../vdom');
var i18n = require('../i18n')();
var emitter = require('../emitter');
var immutable = require('../immutable');
var partialList = require('../partial-list');

var postTemplate = require('../common/featured-post');
var stashItemTemplate = require('../common/stash-item');
var sectionTitleTemplate = require('../common/section-title');
var loadButtonTemplate = require('../common/load-button');
var formGroupTemplate = require('../common/form-group');
var formButtonTemplate = require('../common/form-button');

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
	var user_stash = data.user_stash;
	var user_profile = data.user_profile;
	var ui = data.ui;
	var client = data.client;
	var version = data.version.asset;

	// 1st section, tabs, always shown
	var user_posts_title, user_posts_list, user_posts_button, form;

	// scenario 1: default tab active
	if (!ui['recent-posts-section']) {
		if (user_profile.current_user) {
			user_posts_title = sectionTitleTemplate({
				tabs: ['section.titles.recent-posts', 'section.titles.user-stash']
				, key: 'recent-posts'
				, active: ui['recent-posts-section'] || 0
				, bottom: true
			});
		} else {
			user_posts_title = sectionTitleTemplate({
				title: 'section.titles.recent-posts'
				, key: 'recent-posts'
				, bottom: true
			});
		}

		// trick to hide loaded post, so 1st load more is always fast
		user_posts = partialList(user_posts, 8, ui['load-user-posts']);

		// render posts, use immutable
		user_posts_list = user_posts.map(function(post, i) {
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
	}

	// scenario 2: user stash
	if (ui['recent-posts-section'] === 1) {
		// same tricks as scenario 1
		user_posts_title = sectionTitleTemplate({
			tabs: ['section.titles.recent-posts', 'section.titles.user-stash']
			, key: 'recent-posts'
			, active: ui['recent-posts-section'] || 0
			, bottom: true
		});

		user_stash = partialList(user_stash, 20, ui['load-user-stash']);

		user_posts_list = user_stash.map(function(item, i) {
			var opts = {
				num: i
				, version: version
				, view: 'user_stash'
				, client: client
				, cache: ui['load-user-stash'] > 50
			};

			return immutable(stashItemTemplate, item, opts);
		});

		// load more button
		var user_stash_count = user_posts_list.length;

		if (!ui['load-user-stash'] || user_stash_count >= ui['load-user-stash']) {
			user_posts_button = loadButtonTemplate({
				title: 'section.load.user-stash'
				, key: 'load-user-stash'
				, eventName: 'page:load:user-stash'
			});
		} else {
			user_posts_button = loadButtonTemplate({
				title: 'section.load.eof-2'
				, key: 'load-user-stash'
			});
		}
	}

	// scenario 3: app password
	if (ui['recent-posts-section'] === 2) {
		// same tricks as scenario 1
		user_posts_title = sectionTitleTemplate({
			tabs: ['section.titles.recent-posts', 'section.titles.app-password']
			, orders: [0, 2]
			, key: 'recent-posts'
			, active: ui['recent-posts-section']
			, bottom: true
		});

		var message, name_field, submit;

		console.log(ui.form_data);

		// error message, assume plain text
		if (ui.form_error) {
			message = $('div.common-message.error', ui.form_error);

		// success message, assume object
		} else if (ui.form_data && ui.form_data.user && ui.form_data.name && ui.form_data.pass) {
			message = $('div.common-message.success', [
				$('span', i18n.t('message.common.create-app-password'))
				, $('span', ui.form_data.user + ':' + ui.form_data.name + ':' + ui.form_data.pass)
			]);
		}

		// normalize field cache
		var field_data = ui.field_data || {};
		var field_error = ui.field_error || {};

		// fields
		name_field = formGroupTemplate({
			id: 'app-password-name'
			, name: 'name'
			, value: field_data.name || ''
			, error: !!field_error.name
		});

		// submit button
		submit = formButtonTemplate({
			text: 'form.button.app-password-submit'
			, icon: 'music_play'
			, version: version
			, loading: ui.form_loading
		});

		// form id for event handler
		var submitOpts = { id: 'app-password', route: 'app_password', method: 'POST' };

		var formOpts = {
			action: '#'
			, method: 'POST'
			, id: submitOpts.id
			, key: submitOpts.id
			, className: 'common-form'
			, 'ev-submit': emitter.capture('page:form:submit', submitOpts)
		};

		form = $('form', formOpts, [message, name_field, submit]);
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
		, form
	]);

	return home;
};
