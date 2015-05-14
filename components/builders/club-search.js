
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
		name: 'q'
		, value: flash && flash.body ? flash.body['q'] : data.search
		, error: flash && flash.attrs && flash.attrs.indexOf('q') !== -1 ? '.error' : ''
		, placeholder: i18n.t('club.search-term-placeholder')
		, submit_text: i18n.t('club.search-submit')
	});

	data.form_title = i18n.t('club.search-club');
	data.form_intro = i18n.t('club.search-club-intro');
	data.club_form_error = templates.common.formError(data);
	data.main = templates.club.searchClub(data);

	return data;
};
