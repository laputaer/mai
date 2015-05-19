
/**
 * add-post-form.js
 *
 * Template for post creation
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
	var xss = data.xss;
	var club = data.club || {};

	var form = h('div.m-rows', [
		h('div.m-content.m-row-2', [
			data.club_form_error
			, h('div.m-section.yellow.lead', [
				h('h1.m-subtitle', data.form_title)
				, h('p.m-line', data.form_intro)
				, h('form.m-form.m-cells', {
					action: '/c/' + xss.path(club.slug) + '/p/post-add'
					, method: 'POST'
				}, [
					data.csrf_field
					, data.url_group
					, data.form_submit
				])
				, data.form_cancel
			])
		])
	]);

	return form;
};
