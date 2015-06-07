
/**
 * ranking.js
 *
 * Template for default ranked club section
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
	var search = $('div.m-rows', [
		$('div.m-content.m-row-2', [
			$('div.m-section.green.lead', [
				$('h1.m-subtitle', i18n.t('club.ranking-result'))
				, $('div.m-list', data.ranking_result)
			])
			, $('div.m-section.green', [
				$('h1.m-subtitle', i18n.t('club.ranking-created'))
				, $('div.m-list', data.created_result)
			])
		])
	]);

	return search;
};