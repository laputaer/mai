
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
	var xss = data.xss;

	data.search_group = templates.common.formSearch({
		id: 'club-search'
		, name: 'q'
		, value: flash && flash.body ? xss.attr(flash.body['q']) : xss.attr(data.search)
		, error: flash && flash.attrs && flash.attrs.indexOf('q') !== -1 ? '.error' : ''
		, i18n: data.i18n
	});

	data.search_result = data.clubs.map(function(club) {
		var button = {
			href: '/c/' + xss.path(club.slug)
			, icon: 'arrow_right'
			, text: xss.data(club.title)
			, version: data.version.asset
			, base_url: data.base_url
		};
		return templates.common.button(button);
	});

	data.club_form_error = templates.common.formError(data);
	data.main = templates.club.searchClub(data);

	return data;
};
