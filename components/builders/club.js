
/**
 * club.js
 *
 * Render club page body
 */

var containerTemplate = require('../templates/club/container');
var addClubTemplate = require('../templates/club/add-club');
var searchClubTemplate = require('../templates/club/search-club');
var clubListTemplate = require('../templates/club/club-list');
var joinedClubListTemplate = require('../templates/club/joined-club-list');
var buttonTemplate = require('../templates/common/button');
var formSearchTemplate = require('../templates/common/form-search');

var bodyBuilder = require('./body');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	var i18n = data.i18n;
	data.club_create_button = buttonTemplate({
		href: '/c/club-add'
		, icon: 'dialogue_add'
		, text: data.i18n.t('club.create-button')
		, type: ['highlight', 'medium']
		, version: data.version.asset
	});
	data.add_club = addClubTemplate(data);
	data.search_club = formSearchTemplate({
		name: 'q'
		, value: ''
		, error: ''
		, placeholder: i18n.t('club.search-term-placeholder')
		, submit_text: i18n.t('club.search-submit')
	});

	data.my_club_buttons = data.clubs.map(function(club) {
		var button = {
			href: '/c/' + club.slug
			, icon: 'arrow_right'
			, text: club.title
			, version: data.version.asset
		};
		return buttonTemplate(button);
	});
	data.my_club = clubListTemplate(data);

	data.my_joined_club_buttons = data.joined_clubs.map(function(club) {
		var button = {
			href: '/c/' + club.slug
			, icon: 'arrow_right'
			, text: club.title
			, version: data.version.asset
		};
		return buttonTemplate(button);
	});
	data.my_joined_club = joinedClubListTemplate(data);

	data.main = containerTemplate(data);

	return bodyBuilder(data);
};
