
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
	data.search_group = templates.common.formGroup({
		id: 'club-q'
		, name: 'q'
		, value: flash && flash.body ? flash.body['q'] : data.search
		, error: flash && flash.attrs && flash.attrs.indexOf('q') !== -1 ? '.error' : ''
		, label: i18n.t('club.search-term')
		, note: i18n.t('club.search-term-note')
		, placeholder: i18n.t('club.search-term-placeholder')
	});
	data.form_submit = templates.common.formSubmit({
		text: data.i18n.t('club.search-submit')
	});
	data.form_cancel = templates.common.button({
		href: '/c/club-home'
		, text: data.i18n.t('club.search-cancel')
	});

	data.form_title = i18n.t('club.search-club');
	data.form_intro = i18n.t('club.search-club-intro');
	data.club_form_error = templates.common.formError(data);
	data.main = templates.club.searchClub(data);

	return data;
};
