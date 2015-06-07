
/**
 * add-confirm-form.js
 *
 * Template for post confirm
 */

var $ = require('../vdom');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var i18n = data.i18n;
	var club = data.club || {};

	var form = $('div.m-rows', [
		$('div.m-content.m-row-2', [
			data.club_form_error
			, $('div.m-section.yellow.lead', [
				$('h1.m-subtitle', data.form_title)
				, $('p.m-line', data.form_intro)
				, data.post_preview
				, $('form.m-form.m-cells', {
					action: '/c/' + club.slug + '/p/post-add-2'
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
