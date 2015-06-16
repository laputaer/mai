
/**
 * club-new.js
 *
 * Render club creation form
 */

var templates = require('../templates/index');
var i18n = require('../templates/i18n')();

module.exports = partial;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  Object
 */
function partial(data) {
	var flash = data.flash;

	data.title_group = templates.common.formGroup({
		id: 'club-title'
		, name: 'title'
		, value: flash && flash.body ? flash.body.title : ''
		, error: flash && flash.attrs && flash.attrs.indexOf('title') !== -1 ? '.error' : ''
		, label: i18n.t('club.edit-title')
		, note: i18n.t('club.edit-title-note')
		, placeholder: i18n.t('club.edit-title-placeholder')
	});
	data.slug_group = templates.common.formGroup({
		id: 'club-slug'
		, name: 'slug'
		, value: flash && flash.body ? flash.body.slug : ''
		, error: flash && flash.attrs && flash.attrs.indexOf('slug') !== -1 ? '.error' : ''
		, label: i18n.t('club.edit-slug')
		, note: i18n.t('club.edit-slug-note')
		, placeholder: i18n.t('club.edit-slug-placeholder')
	});
	data.form_submit = templates.common.formSubmit({
		text: i18n.t('club.new-club-submit')
	});

	data.form_title = i18n.t('club.new-club');
	data.form_intro = i18n.t('club.new-club-intro');
	data.csrf_field = templates.common.csrfField({ csrf_token: data.current_user.csrf_token });
	data.club_form_error = templates.common.formError(data);
	data.main = templates.club.editorForm(data);

	data.page_title = i18n.t('club.new-club');

	return data;
};
