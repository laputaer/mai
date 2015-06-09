
/**
 * search-club.js
 *
 * Template for default search club section
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var search = $('div.m-rows', [
		$('div.m-content.m-row-2', [
			data.club_form_error
			, $('div.m-section.blue.lead', [
				$('h1.m-subtitle', i18n.t('club.search-club'))
				, $('form.m-form', {
					action: '/c/club-search'
					, method: 'GET'
				}, [
					data.search_group
				])
			])
			, $('div.m-section.green', [
				$('h1.m-subtitle', i18n.t('club.search-result'))
				, $('p.m-line', i18n.t('club.search-result-intro', {
					search: data.search
					, count: data.search_result.length || 0
				}))
				, $('div.m-list', data.search_result)
			])
		])
	]);

	return search;
};