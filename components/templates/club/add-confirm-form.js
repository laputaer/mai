
/**
 * add-confirm-form.js
 *
 * Template for post confirm
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
			, h('div.m-section.yellow.lead', [
				h('h1.m-subtitle', data.form_title)
				, h('p.m-line', data.form_intro)
				, data.post_preview
				, h('form.m-form.m-cells', {
					action: '/c/' + club.slug + '/p'
					, method: 'POST'
				}, [
					data.csrf_field
					, data.title_group
					, data.summary_group
					, data.form_submit
				])
				, data.form_cancel
			])
		])
	]);

	return form;
};
