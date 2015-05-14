
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
	});

	data.my_club_buttons = data.clubs.map(function(club) {
		var button = {
			href: '/c/' + club.slug
			, icon: 'arrow_right'
			, text: club.title
			, version: data.version.asset
		};
		return templates.common.button(button);
	});

	data.my_joined_club_buttons = data.joined_clubs.map(function(club) {
		var button = {
			href: '/c/' + club.slug
			, icon: 'arrow_right'
			, text: club.title
			, version: data.version.asset
		};
		return templates.common.button(button);
	});

	data.search_group = templates.common.formSearch({
		id: 'club-search'
		, name: 'q'
		, value: ''
		, error: ''
		, i18n: data.i18n
	});

	data.main = templates.club.userHome(data);

	return data;
};
