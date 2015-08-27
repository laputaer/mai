
/**
 * club-profile.js
 *
 * Template for club profile page
 */

var $ = require('../vdom');
var i18n = require('../i18n')();
var emitter = require('../emitter');
var immutable = require('../immutable');
var partialList = require('../partial-list');

var postTemplate = require('../common/featured-post');
var sectionTitleTemplate = require('../common/section-title');
var loadButtonTemplate = require('../common/load-button');
var formGroupTemplate = require('../common/form-group');
var formButtonTemplate = require('../common/form-button');
var navButtonTemplate = require('../common/navigation-button');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	// common data
	var club_profile = data.club_profile;
	var club_posts = data.club_posts;
	var stash_item = data.stash_item;
	var ui = data.ui;
	var client = data.client;
	var version = data.version.asset;

	var club_posts_title, club_posts_list, club_posts_button, form;

	// scenario 1: defaul tab active
	if (!ui['club-posts-section']) {
		// 1st section, tabs
		club_posts_title = sectionTitleTemplate({
			tabs: ['section.titles.recent-posts', 'section.titles.create-post']
			, key: 'club-posts'
			, active: ui['club-posts-section'] || 0
			, bottom: true
		});

		// trick to hide loaded post, so 1st load more is always fast
		club_posts = partialList(club_posts, 8, ui['load-club-posts']);

		// render posts, use immutable
		club_posts_list = club_posts.map(function (post, i) {
			var opts = {
				num: i
				, version: version
				, view: 'club_posts'
				, client: client
				, cache: ui['load-club-posts'] > 50
			};

			return immutable(postTemplate, post, opts);
		});

		// load more button
		var club_posts_count = club_posts_list.length;
		var club_posts_button;
		if (!ui['load-club-posts'] || club_posts_count >= ui['load-club-posts']) {
			club_posts_button = loadButtonTemplate({
				title: 'section.load.club-posts'
				, key: 'load-club-posts'
				, eventName: 'page:load:club-posts'
			});
		} else {
			club_posts_button = loadButtonTemplate({
				title: 'section.load.eof-2'
				, key: 'load-club-posts'
			});
		}
	}

	// scenario 2: new post
	if (ui['club-posts-section'] === 1) {
		// 1st section, tabs
		club_posts_title = sectionTitleTemplate({
			tabs: ['section.titles.recent-posts', 'section.titles.create-post']
			, key: 'club-posts'
			, active: ui['club-posts-section']
			, bottom: true
		});

		var message, post_preview, link_field, title_field, summary_field, submitOpts, submit, bookmarklet;

		// error message, assume plain text
		if (ui.form_error) {
			message = $('div.common-message.error', ui.form_error);

		// success message, assume object
		} else if (ui.form_data && ui.form_data.club && ui.form_data.club_name) {
			// multi-step message
			if (ui.form_step === 1) {
				message = $('div.common-message.success', i18n.t('message.common.create-post-preview'));
			} else if (ui.form_step === 2) {
				message = $('div.common-message.success', [
					$('span', i18n.t('message.common.create-post-success'))
					, $('a', {
						href: '/c/' + ui.form_data.club
					}, ui.form_data.club_name)
				]);
			}
		}

		// normalize field cache
		var field_data = ui.field_data || {};
		var field_error = ui.field_error || {};

		// multi-step form
		if (!ui.form_step) {
			// fields
			link_field = formGroupTemplate({
				id: 'create-post-link'
				, name: 'link'
				, value: field_data.link || stash_item.url || ''
				, error: !!field_error.link
			});

			// submit button
			submit = formButtonTemplate({
				text: 'form.button.create-post-submit-1'
				, icon: 'music_play'
				, version: version
				, loading: ui.form_loading
			});

			// form id for event handler
			submitOpts = { id: 'init-post', route: 'init_post', params: [club_profile.slug], method: 'POST' };

			// TODO: bookmarklet
		} else if (ui.form_step === 1 || ui.form_step === 2) {
			// post preview
			if (ui.form_data) {
				post_preview = $('div.form-preview', postTemplate(ui.form_data));
			}

			// fields
			title_field = formGroupTemplate({
				id: 'create-post-title'
				, name: 'title'
				, value: field_data.title || ''
				, error: !!field_error.title
			});

			summary_field = formGroupTemplate({
				id: 'create-post-summary'
				, name: 'summary'
				, value: field_data.summary || ''
				, error: !!field_error.summary
			});

			// submit button
			submit = formButtonTemplate({
				text: 'form.button.create-post-submit-2'
			});

			// form id for event handler
			submitOpts = { id: 'create-post', route: 'create_post', params: [club_profile.slug], method: 'POST' };
		}

		var formOpts = {
			action: '#'
			, method: 'POST'
			, id: submitOpts.id
			, key: submitOpts.id
			, className: 'common-form'
			, 'ev-submit': emitter.capture('page:form:submit', submitOpts)
		};

		form = $('form', formOpts, [message, post_preview, link_field, title_field, summary_field, submit, bookmarklet]);
	}

	// scenario 3: club management
	if (ui['club-posts-section'] === 2) {
		// 1st section, tabs
		club_posts_title = sectionTitleTemplate({
			tabs: ['section.titles.recent-posts', 'section.titles.manage-club']
			, orders: [0, 2]
			, key: 'club-posts'
			, active: ui['club-posts-section']
			, bottom: true
		});

		var message, title_field, slug_field, logo_field, intro_field, submit;

		// error message, assume plain text
		if (ui.form_error) {
			message = $('div.common-message.error', ui.form_error);

		// success message, assume object
		} else if (ui.form_data && ui.form_data.title && ui.form_data.slug) {
			message = $('div.common-message.success', [
				$('span', i18n.t('message.common.manage-club-success'))
				, $('a', {
					href: '/c/' + ui.form_data.slug
				}, ui.form_data.title)
			]);
		}

		// normalize field cache
		var field_data = ui.field_data || {};
		var field_error = ui.field_error || {};

		// fields
		title_field = formGroupTemplate({
			id: 'manage-club-title'
			, name: 'title'
			, value: field_data.title || club_profile.title || ''
			, error: !!field_error.title
		});

		slug_field = formGroupTemplate({
			id: 'manage-club-slug'
			, name: 'slug'
			, value: field_data.slug || club_profile.slug || ''
			, error: !!field_error.slug
		});

		logo_field = formGroupTemplate({
			id: 'manage-club-logo'
			, name: 'logo'
			, value: field_data.logo || club_profile.logo || ''
			, error: !!field_error.logo
		});

		intro_field = formGroupTemplate({
			id: 'manage-club-intro'
			, name: 'intro'
			, value: field_data.intro || club_profile.intro || ''
			, error: !!field_error.intro
		});

		// submit button
		submit = formButtonTemplate({
			text: 'form.button.manage-club-submit'
		});

		// form id for event handler
		var submitOpts = { id: 'manage-club', route: 'manage_club', params: [club_profile.slug], method: 'PUT' };

		var formOpts = {
			action: '#'
			, method: 'POST'
			, id: submitOpts.id
			, key: submitOpts.id
			, className: 'common-form'
			, 'ev-submit': emitter.capture('page:form:submit', submitOpts)
		};

		form = $('form', formOpts, [message, title_field, slug_field, logo_field, intro_field, submit]);
	}

	// page content
	var homeOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var home = $('div', homeOpts, [
		club_posts_title
		, club_posts_list
		, club_posts_button
		, form
	]);

	return home;
};
