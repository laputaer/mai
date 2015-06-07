
/**
 * add-post-form.js
 *
 * Template for post creation
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
				, $('form.m-form.m-cells', {
					action: '/c/' + club.slug + '/p/post-add'
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
