
/**
 * club-editor.js
 *
 * Render a club manamgement form
 */

var editorFormTemplate = require('../templates/club/editor-form');
var formErrorTemplate = require('../templates/common/form-error');
var csrfFieldTemplate = require('../templates/common/csrf-field');
var formGroupTemplate = require('../templates/common/form-group');

var bodyBuilder = require('./body');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	var flash = data.flash;
	var i18n = data.i18n;
	data.title_group = formGroupTemplate({
		id: 'club-title'
		, name: 'title'
		, value: flash && flash.body ? flash.body['title'] : ''
		, error: flash && flash.attrs && flash.attrs.indexOf('title') ? '.error' : ''
		, label: i18n.t('club.new-club-title')
		, note: i18n.t('club.new-club-title-note')
		, placeholder: i18n.t('club.new-club-title-placeholder')
	});
	data.slug_group = formGroupTemplate({
		id: 'club-slug'
		, name: 'slug'
		, value: flash && flash.body ? flash.body['slug'] : ''
		, error: flash && flash.attrs && flash.attrs.indexOf('slug') ? '.error' : ''
		, label: i18n.t('club.new-club-slug')
		, note: i18n.t('club.new-club-slug-note')
		, placeholder: i18n.t('club.new-club-slug-placeholder')
	});

	data.csrf_field = csrfFieldTemplate({ csrf_token: data.current_user.csrf_token });
	data.club_form_error = formErrorTemplate(data);
	data.main = editorFormTemplate(data);

	return bodyBuilder(data);
};
