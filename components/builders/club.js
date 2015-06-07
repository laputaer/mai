
/**
 * club.js
 *
 * Render club page body
 */

var templates = require('../templates/index');

module.exports = partial;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  Object
 */
function partial(data) {
	var i18n = data.i18n;

	data.club_create_button = templates.common.button({
		href: '/c/club-add'
		, icon: 'dialogue_add'
		, text: data.i18n.t('club.create-button')
		, type: ['highlight']
		, version: data.version.asset
		, base_url: data.base_url
	});

	data.my_club_buttons = data.clubs.map(function(club) {
		return templates.common.clubPreview({
			club: club
			, i18n: i18n
		});
	});

	data.my_joined_club_buttons = data.joined_clubs.map(function(club) {
		return templates.common.clubPreview({
			club: club
			, i18n: i18n
		});
	});

	data.search_group = templates.common.formSearch({
		id: 'club-search'
		, name: 'q'
		, value: ''
		, error: ''
		, i18n: data.i18n
	});

	data.main = templates.club.userHome(data);

	data.page_title = i18n.t('menu.nav.club');

	return data;
};
