
/**
 * club.js
 *
 * Render club page body
 */

var containerTemplate = require('../templates/club/container');
var addClubTemplate = require('../templates/club/add-club');
var searchClubTemplate = require('../templates/club/search-club');
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
	data.my_club = undefined;

	data.main = containerTemplate(data);

	return bodyBuilder(data);
};
