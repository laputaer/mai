
/**
 * club-search.js
 *
 * Render club search page body
 */

var containerTemplate = require('../templates/club/container');
var searchClubTemplate = require('../templates/club/search-club');
var clubSearchListTemplate = require('../templates/club/club-search-list');
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
	data.search_club = searchClubTemplate(data);
	data.search_club_buttons = data.clubs.map(function(club) {
		var button = {
			href: '/c/' + club.slug
			, icon: 'arrow_right'
			, text: club.title
			, version: data.version.asset
		};
		return buttonTemplate(button);
	});
	data.search_club_results = clubSearchListTemplate(data);

	data.main = containerTemplate(data);

	return bodyBuilder(data);
};
