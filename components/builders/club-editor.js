
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
	var xss = data.xss;

	data.title_group = templates.common.formGroup({
		id: 'club-title'
		, name: 'title'
		, value: flash && flash.body ? xss.attr(flash.body['title']) : xss.attr(data.club.title)
		, error: flash && flash.attrs && flash.attrs.indexOf('title') !== -1 ? '.error' : ''
		, label: i18n.t('club.edit-title')
		, note: i18n.t('club.edit-title-note')
		, placeholder: i18n.t('club.edit-title-placeholder')
	});
	data.slug_group = templates.common.formGroup({
		id: 'club-slug'
		, name: 'slug'
		, value: flash && flash.body ? xss.attr(flash.body['slug']) : xss.attr(data.club.slug)
		, error: flash && flash.attrs && flash.attrs.indexOf('slug') !== -1 ? '.error' : ''
		, label: i18n.t('club.edit-slug')
		, note: i18n.t('club.edit-slug-note')
		, placeholder: i18n.t('club.edit-slug-placeholder')
	});
	data.intro_group = templates.common.formGroup({
		id: 'club-intro'
		, name: 'intro'
		, value: flash && flash.body ? xss.attr(flash.body['intro']) : xss.attr(data.club.intro || '')
		, error: flash && flash.attrs && flash.attrs.indexOf('intro') !== -1 ? '.error' : ''
		, label: i18n.t('club.edit-intro')
		, note: i18n.t('club.edit-intro-note')
		, placeholder: i18n.t('club.edit-intro-placeholder')
	});
	data.logo_group = templates.common.formGroup({
		id: 'club-logo'
		, name: 'logo'
		, value: flash && flash.body ? xss.attr(flash.body['logo']) : xss.attr(data.club.logo || '')
		, error: flash && flash.attrs && flash.attrs.indexOf('logo') !== -1 ? '.error' : ''
		, label: i18n.t('club.edit-logo')
		, note: i18n.t('club.edit-logo-note')
		, placeholder: i18n.t('club.edit-logo-placeholder')
	});
	data.form_submit = templates.common.formSubmit({
		text: data.i18n.t('club.edit-club-submit')
	});
	data.form_cancel = templates.common.button({
		href: '/c/' + xss.path(data.club.slug)
		, text: data.i18n.t('club.edit-form-cancel')
	});

	data.form_title = i18n.t('club.edit-club');
	data.form_intro = i18n.t('club.edit-club-intro');
	data.csrf_field = templates.common.csrfField({ csrf_token: data.current_user.csrf_token });
	data.club_form_error = templates.common.formError(data);
	data.main = templates.club.editorForm(data);

	data.page_title = i18n.t('club.edit-club');

	return data;
};
