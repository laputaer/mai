
/**
 * editor-form.js
 *
 * Template for club management
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
	var club = data.club || {};

	var form = $('div.m-rows', [
		$('div.m-content.m-row-2', [
			data.club_form_error
			, $('div.m-section.yellow.lead', [
				$('h1.m-subtitle', data.form_title)
				, $('p.m-line', data.form_intro)
				, $('form.m-form.m-cells', {
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
