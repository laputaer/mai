
/**
 * menu-item.js
 *
 * Template for navigation menu item
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
	var item = h('li.item', [
		h('a.m-button.rounded', {
			'href': data.href
		}, [
			svg('svg.m-icon', [
				svg('use', {
					'xlink:href': '/assets/icons.svg?' + data.version + '#' + data.icon
				})
			])
			, h('span.m-text', data.text)
		])
	])

	return item;
};