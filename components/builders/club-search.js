
/**
 * club-search.js
 *
 * Render club search page body
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
	var flash = data.flash;
	var i18n = data.i18n;
	data.search_group = templates.common.formSearch({
		id: 'club-search'
		, name: 'q'
		, value: flash && flash.body ? flash.body['q'] : data.search
		, error: flash && flash.attrs && flash.attrs.indexOf('q') !== -1 ? '.error' : ''
		, i18n: data.i18n
	});

	data.search_result = data.clubs.map(function(club) {
		var button = {
			href: '/c/' + club.slug
			, icon: 'arrow_right'
			, text: club.title
			, version: data.version.asset
		};
		return templates.common.button(button);
	});

	data.club_form_error = templates.common.formError(data);
	data.main = templates.club.searchClub(data);

	return data;
};
