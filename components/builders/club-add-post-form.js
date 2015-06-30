
/**
 * club-add-post-form.js
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

	data.url_group = templates.common.formGroup({
		id: 'club-post-link'
		, name: 'link'
		, value: flash && flash.body ? flash.body.link : ''
		, error: flash && flash.attrs && flash.attrs.indexOf('link') !== -1 ? '.error' : ''
		, label: i18n.t('club.post-link')
		, note: i18n.t('club.post-link-note')
		, placeholder: i18n.t('club.post-link-placeholder')
	});
	data.form_submit = templates.common.formSubmit({
		text: i18n.t('club.new-post-submit')
	});
	data.form_cancel = templates.common.button({
		href: '/c/' + data.club.slug
		, text: i18n.t('club.edit-form-cancel')
		, type: ['cancel']
	});

	data.form_title = i18n.t('club.new-post');
	data.form_intro = i18n.t('club.new-post-intro');
	data.csrf_field = templates.common.csrfField({ csrf_token: data.current_user.csrf_token });
	data.club_form_error = templates.common.formError(data);
	data.main = templates.club.addPostForm(data);

	data.page_title = i18n.t('club.new-post');

	return data;
};
