
/**
 * vdom.js
 *
 * A virtual-dom compatibility layer
 */

var h = require('virtual-dom/h');
var svg = require('virtual-dom/virtual-hyperscript/svg');
var svg_tags = ['svg', 'use'];

module.exports = vdom;

/**
 * A simple api that abstracts vdom api
 *
 * @param   String  el        Tagname with class or id
 * @param   Object  props     Element properties
 * @param   Array   children  List of child nodes
 * @return  VNode
 */
function vdom(el, props, children) {
	var vnode;
	var hint = el.split(/(\.|#)+/);

	if (svg_tags.indexOf(hint[0]) !== -1) {
		vnode = svg;
	} else {
		vnode = h;
	}

	return vnode(el, props, children);
};
