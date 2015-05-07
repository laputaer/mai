
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
			, h('h1.subtitle', i18n.t('club.owner-management'))
			, h('p.line', i18n.t('club.owner-management-intro'))
			, h('form.m-form.m-cells', {
				action: club.slug ? '/c/' + club.slug : '/club'
				, method: 'POST'
			}, [
				data.csrf_field
				, data.title_group
				, data.slug_group
				, h('div.m-group.m-last-cell', [
					h('button.m-submit', {
						type: 'submit'
					}, i18n.t('club.new-club-submit'))
				])
			])
		])
	]);

	return form;
};
