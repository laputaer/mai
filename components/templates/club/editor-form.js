
/**
 * editor-form.js
 *
 * Template for club management
 */

var h = require('virtual-dom/h');
var svg = require('virtual-dom/virtual-hyperscript/svg');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var i18n = data.i18n;
	var flash = data.flash;
	var club = data.club || {};

	var form = h('div.m-rows', [
		h('div.m-content.m-row-2', [
			data.club_form_error
			, h('div.m-section', [
				h('h1.subtitle', data.form_title)
				, h('p.line', data.form_intro)
				, h('form.m-form.m-cells', {
					action: club.slug ? '/c/' + club.slug : '/c'
					, method: 'POST'
				}, [
					data.csrf_field
					, data.title_group
					, data.slug_group
					, data.intro_group
					, data.logo_group
					, data.form_submit
				])
				, data.form_cancel
			])
		])
	]);

	return form;
};
