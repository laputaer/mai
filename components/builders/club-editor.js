
/**
 * club-editor.js
 *
 * Build a club manamgement form
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
	data.title_group = templates.common.formGroup({
		id: 'club-title'
		, name: 'title'
		, value: flash && flash.body ? flash.body['title'] : ''
		, error: flash && flash.attrs && flash.attrs.indexOf('title') ? '.error' : ''
		, label: i18n.t('club.new-club-title')
		, note: i18n.t('club.new-club-title-note')
		, placeholder: i18n.t('club.new-club-title-placeholder')
	});
	data.slug_group = templates.common.formGroup({
		id: 'club-slug'
		, name: 'slug'
		, value: flash && flash.body ? flash.body['slug'] : ''
		, error: flash && flash.attrs && flash.attrs.indexOf('slug') ? '.error' : ''
		, label: i18n.t('club.new-club-slug')
		, note: i18n.t('club.new-club-slug-note')
		, placeholder: i18n.t('club.new-club-slug-placeholder')
	});

	data.csrf_field = templates.common.csrfField({ csrf_token: data.current_user.csrf_token });
	data.club_form_error = templates.common.formError(data);
	data.main = templates.club.editorForm(data);

	return data;
};
