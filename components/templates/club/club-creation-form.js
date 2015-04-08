
/**
 * club-creation-form.js
 *
 * Template for new club creation
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
	var club = h('div.club-creation', [
		h('h1.subtitle', i18n.t('club.new-club-intro'))
		, h('p.line', {
			innerHTML: i18n.t('club.new-club-help', {
				help: '<a href="/help" class="link">' + i18n.t('menu.nav.help') + '</a>'
			})
		})
		, h('form.m-form', {
			action: '/club'
			, method: 'POST'
		}, [
			h('div.m-group', [
				h('label.m-label', {
					attributes: {
						'for': 'club-title'
					}
				}, i18n.t('club.new-club-title'))
				, h('input.m-field', {
					placeholder: i18n.t('club.new-club-title-placeholder')
					, name: 'title'
					, id: 'club-title'
				})
			])
			, h('div.m-group', [
				h('label.m-label', {
					attributes: {
						'for': 'club-slug'
					}
				}, i18n.t('club.new-club-slug'))
				, h('input.m-field', {
					placeholder: i18n.t('club.new-club-slug-placeholder')
					, name: 'slug'
					, id: 'club-slug'
				})
			])
			, h('div.m-group', [
				h('label.m-label', {
					attributes: {
						'for': 'club-image'
					}
				}, i18n.t('club.new-club-image'))
				, h('input.m-field', {
					placeholder: i18n.t('club.new-club-image-placeholder')
					, name: 'image'
					, id: 'club-image'
				})
			])
			, h('div.m-group', [
				h('button.m-submit', {
					type: 'submit'
				}, i18n.t('club.new-club-submit'))
			])
		])
	]);

	return club;
};