
/**
 * vdom.js
 *
 * A virtual-dom compatibility layer
 */

var h = require('virtual-dom/h');
var svg = require('virtual-dom/virtual-hyperscript/svg');

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
	var hint = el.substr(0, 3);
	if (hint === 'svg' || hint === 'use') {
		vnode = svg;
	} else {
		vnode = h;
	}

	return vnode(el, props, children);
};
