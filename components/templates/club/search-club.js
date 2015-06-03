
/**
 * search-club.js
 *
 * Template for default search club section
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

	var search = h('div.m-rows', [
		h('div.m-content.m-row-2', [
			data.club_form_error
			, h('div.m-section.blue.lead', [
				h('h1.m-subtitle', i18n.t('club.search-club'))
				, h('form.m-form', {
					action: '/c/club-search'
					, method: 'GET'
				}, [
					data.search_group
				])
			])
			, h('div.m-section.green', [
				h('h1.m-subtitle', i18n.t('club.search-result'))
				, h('p.m-line', i18n.t('club.search-result-intro', {
					search: xss.data(data.search)
					, count: data.search_result.length || 0
				}))
				, h('div.m-list', data.search_result)
			])
		])
	]);

	return search;
};