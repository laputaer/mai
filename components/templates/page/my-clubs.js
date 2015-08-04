
/**
 * my-clubs.js
 *
 * Template for my clubs page
 */

var $ = require('../vdom');
var i18n = require('../i18n')();
var emitter = require('../emitter');
var immutable = require('../immutable');
var partialList = require('../partial-list');

var clubTemplate = require('../common/featured-club');
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
	var my_clubs = data.my_clubs;
	var joined_clubs = data.joined_clubs;
	var ui = data.ui;
	var client = data.client;

	// 1st section, tabs, always shown
	var my_clubs_title = sectionTitleTemplate({
		tabs: ['section.titles.my-clubs', 'section.titles.create-club']
		, key: 'my-clubs'
		, active: ui['my-clubs-section'] || 0
	});

	var my_clubs_button, my_clubs_list, joined_clubs_title, joined_clubs_list, joined_clubs_button, form;

	// scenario 1: defaul tab active
	if (!ui['my-clubs-section']) {
		// trick to hide loaded post, so 1st load more is always fast
		my_clubs = partialList(my_clubs, 10, ui['load-my-clubs']);

		// render posts, use immutable 
		my_clubs_list = my_clubs.map(function(club) {
			var opts = {
				client: client
				, cache: ui['load-my-clubs'] > 50
				, prefix: 'my-club'
			};

			return immutable(clubTemplate, club, opts);
		}); 

		// load more button
		my_clubs_button = loadButtonTemplate({
			title: 'section.load.my-clubs'
			, key: 'load-my-clubs'
			, eventName: 'page:load:my-clubs'
		});

		// 2st section, plain title
		joined_clubs_title = sectionTitleTemplate({
			title: 'section.titles.joined-clubs'
			, key: 'joined-clubs'
			, top: true
		});

		// render 2st section, same tricks as 1st section
		joined_clubs = partialList(joined_clubs, 10, ui['load-joined-clubs']);

		joined_clubs_list = joined_clubs.map(function(club) {
			var opts = {
				client: client
				, cache: ui['load-joined-clubs'] > 50
				, prefix: 'joined-club'
			};

			return immutable(clubTemplate, club, opts);
		});

		joined_clubs_button = loadButtonTemplate({
			title: 'section.load.joined-clubs'
			, key: 'load-joined-clubs'
			, eventName: 'page:load:joined-clubs'
		});
	}

	// scenario 2: form tab active
	if (ui['my-clubs-section'] === 1) {
		var message, title_field, slug_field, submit;

		// error message, assume plain text
		if (ui.form_error) {
			message = $('div.common-message.error', ui.form_error);
		}

		// success message, assume data object
		if (ui.form_data && ui.form_data.title && ui.form_data.slug) {
			message = $('div.common-message.success', [
				$('span', i18n.t('message.common.club-create-success'))
				, $('a', {
					href: '/c/' + data.ui.form_data.slug
				}, ui.form_data.title)
			]);
		}

		// normalize field data
		var field_data = ui.field_data || {};
		var field_error = ui.field_error || {};

		// fields
		title_field = formGroupTemplate({
			id: 'create-club-title'
			, name: 'title'
			, value: field_data.title || ''
			, error: !!field_error.title
		});

		slug_field = formGroupTemplate({
			id: 'create-club-slug'
			, name: 'slug'
			, value: field_data.slug || ''
			, error: !!field_error.slug
		});

		// submit button
		submit = formButtonTemplate({
			text: 'form.button.create-club-submit'
			, icon: 'plus'
			, version: data.version.asset
		});

		// form id for event handler
		var submitOpts = { id: 'create-club' };

		var formOpts = {
			action: '#'
			, method: 'POST'
			, id: submitOpts.id
			, key: submitOpts.id
			, className: 'common-form'
			, 'ev-submit': emitter.capture('page:form:submit', submitOpts)
		};

		form = $('form', formOpts, [message, title_field, slug_field, submit]);
	}

	// page content
	var clubOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var club = $('div', clubOpts, [
		my_clubs_title
		, my_clubs_list
		, my_clubs_button
		, joined_clubs_title
		, joined_clubs_list
		, joined_clubs_button
		, form
	]);

	return club;
};
