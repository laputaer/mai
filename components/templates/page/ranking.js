
/**
 * ranking.js
 *
 * Template for default ranked club section
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
			h('div.m-section.green.lead', [
				h('h1.m-subtitle', i18n.t('club.ranking-result'))
				, h('div.m-list', data.ranking_result)
			])
			, h('div.m-section.green', [
				h('h1.m-subtitle', i18n.t('club.ranking-created'))
				, h('div.m-list', data.created_result)
			])
		])
	]);

	return search;
};