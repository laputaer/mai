
/**
 * club.js
 *
 * Render club page body
 */

var containerTemplate = require('../templates/club/container');
var addClubTemplate = require('../templates/club/add-club');
var searchClubTemplate = require('../templates/club/search-club');
var clubListTemplate = require('../templates/club/club-list');
var buttonTemplate = require('../templates/common/button');

var bodyBuilder = require('./body');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	data.club_create_button = buttonTemplate({
		href: '/club/add'
		, icon: 'dialogue_add'
		, text: data.i18n.t('club.create-button')
		, type: ['highlight', 'medium']
		, version: data.version.asset
	});
	data.add_club = addClubTemplate(data);
	data.search_club = searchClubTemplate(data);

	data.my_club_buttons = data.clubs.map(function(club) {
		var button = {
			href: '/c/' + club.slug
			, icon: 'arrow_right'
			, text: club.title
			, type: ['medium']
			, version: data.version.asset
		};
		return buttonTemplate(button);
	});
	data.my_club = clubListTemplate(data);

	data.main = containerTemplate(data);

	return bodyBuilder(data);
};
