
/**
 * my-clubs.js
 *
 * Template for my clubs page
 */

var $ = require('../vdom');
var emitter = require('../emitter');
var immutable = require('../immutable');

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
	var section_title_1 = sectionTitleTemplate({
		tabs: ['section.titles.my-clubs', 'section.titles.create-club']
		, key: 'my-clubs'
		, view: 'my_clubs_section_1'
		, active: data.ui.my_clubs_section_1 || 0
	});

	var section_title_2 = sectionTitleTemplate({
		title: 'section.titles.joined-clubs'
		, key: 'joined-clubs'
		, top: true
	});

	var my_clubs = data.my_clubs;
	var joined_clubs = data.joined_clubs;
	var section_1, load_button_1;

	if (!data.ui.my_clubs_section_1) {
		if (!data.ui.load_my_clubs) {
			my_clubs = my_clubs.slice(0, 10);
		} else if (data.ui.load_my_clubs > 0) {
			my_clubs = my_clubs.slice(0, data.ui.load_my_clubs);
		}

		section_1 = my_clubs.map(function(club) {
			var opts = {
				client: data.client
				, count: data.ui.load_my_clubs
				, prefix: 'my-club'
			};

			return immutable(clubTemplate, club, opts);
		}); 

		load_button_1 = loadButtonTemplate({
			title: 'section.load.my-clubs'
			, key: 'load-my-clubs'
			, eventName: 'ev-click'
			, eventHandler: emitter.capture('page:load:my-clubs')
		});
	} else if (data.ui.my_clubs_section_1 === 1) {
		var message_1;
		if (data.ui.form_error) {
			message_1 = $('div.common-message', data.ui.form_error);
		}

		var field_1 = formGroupTemplate({
			id: 'create-club-title'
			, name: 'title'
			, value: ''
			, label: 'form.label.create-club-title'
		});

		var field_2 = formGroupTemplate({
			id: 'create-club-slug'
			, name: 'slug'
			, value: ''
			, label: 'form.label.create-club-slug'
		});

		var submit_1 = formButtonTemplate({
			text: 'form.button.create-club-submit'
			, icon: 'plus'
			, version: data.version.asset
		});

		var submitOpts = { id: 'create-club' };
		var formOpts = {
			action: '#'
			, method: 'POST'
			, id: submitOpts.id
			, key: submitOpts.id
			, 'ev-submit': emitter.capture('page:form:submit', submitOpts)
		};

		section_1 = $('form.common-form', formOpts, [message_1, field_1, field_2, submit_1]);
	}

	if (!data.ui.load_joined_clubs) {
		joined_clubs = joined_clubs.slice(0, 10);
	} else if (data.ui.load_joined_clubs > 0) {
		joined_clubs = joined_clubs.slice(0, data.ui.load_joined_clubs);
	}

	var section_2 = joined_clubs.map(function(club) {
		var opts = {
			client: data.client
			, count: data.ui.load_joined_clubs
			, prefix: 'joined-club'
		};

		return immutable(clubTemplate, club, opts);
	});

	var load_button_2 = loadButtonTemplate({
		title: 'section.load.joined-clubs'
		, key: 'load-joined-clubs'
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:load:joined-clubs')
	});

	var clubOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var club = $('div', clubOpts, [
		section_title_1
		, section_1
		, load_button_1
		, section_title_2
		, section_2
		, load_button_2
	]);

	return club;
};
