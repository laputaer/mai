
/**
 * club-add-confirm-form.js
 *
 * Build a post creation form
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
		id: 'club-post-title'
		, name: 'title'
		, value: flash && flash.body ? flash.body['title'] : ''
		, error: flash && flash.attrs && flash.attrs.indexOf('title') !== -1 ? '.error' : ''
		, label: 'club.post-title'
		, note: i18n.t('club.post-title-note')
		, placeholder: i18n.t('club.post-title-placeholder')
	});

	data.summary_group = templates.common.formTextArea({
		id: 'club-post-summary'
		, name: 'summary'
		, value: flash && flash.body ? flash.body['summary'] : ''
		, error: flash && flash.attrs && flash.attrs.indexOf('summary') !== -1 ? '.error' : ''
		, label: i18n.t('club.post-summary')
		, note: i18n.t('club.post-summary-note')
		, placeholder: i18n.t('club.post-summary-placeholder')
	});

	data.form_submit = templates.common.formSubmit({
		text: i18n.t('club.confirm-post-submit')
	});
	data.form_cancel = templates.common.button({
		href: '/c/' + data.club.slug
		, text: i18n.t('club.edit-form-cancel')
	});

	data.form_title = i18n.t('club.confirm-post');
	data.form_intro = i18n.t('club.confirm-post-intro');
	data.csrf_field = templates.common.csrfField({ csrf_token: data.current_user.csrf_token });
	data.club_form_error = templates.common.formError(data);

	data.post_preview = templates.club.postPreview(data);
	data.main = templates.club.addConfirmForm(data);

	data.page_title = i18n.t('club.confirm-post');

	return data;
};
