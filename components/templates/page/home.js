
/**
 * home.js
 *
 * Template for home page
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
	var container = $('div.m-rows', [
		$('div.m-content.m-row-2', [
			$('div.m-section.green.lead', [
				$('h2.m-subtitle', i18n.t('club.home-result'))
				, $('div.m-list', data.post_list)
			])
		])
	]);

	return container;
};