
/**
 * user-home.js
 *
 * Template for default user club home
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
	var search = h('div.m-rows', [
		h('div.m-content.m-row-2', [
			h('div.m-section.yellow.lead', [
				h('h1.m-subtitle', i18n.t('club.create-club'))
				, h('p.m-line', i18n.t('club.create-club-intro', data.user))
				, data.club_create_button
			])
			, h('div.m-section.blue', [
				h('h1.m-subtitle', i18n.t('club.search-club'))
				, h('form.m-form', {
					action: '/c/club-search'
					, method: 'GET'
				}, [
					data.search_group
				])
			])
			, h('div.m-section.green', [
				h('h1.m-subtitle', i18n.t('club.owned-club'))
				, h('div.m-list', data.my_club_buttons)
			])
			, h('div.m-section.green', [
				h('h1.m-subtitle', i18n.t('club.joined-club'))
				, h('div.m-list', data.my_joined_club_buttons)
			])
		])
	]);

	return search;
};