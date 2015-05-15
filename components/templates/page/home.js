
/**
 * home.js
 *
 * Template for home page
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

	var container = h('div.m-rows', [
		h('div.m-content.m-row-2', [
			h('div.m-section.green.lead', [
				h('h2.m-subtitle', i18n.t('club.message-board'))
				, h('div.m-list', data.post_list)
			])
		])
	]);

	return container;
};