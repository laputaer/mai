
/**
 * vdom.js
 *
 * A virtual-dom compatibility layer
 */

var h = require('virtual-dom/h');
var svg = require('virtual-dom/virtual-hyperscript/svg');

/*
var DomLayerTag = require('dom-layer').Tag;
var DomLayerText = require('dom-layer').Text;
var tag = function(el, props, children) {
	return new DomLayerTag(el, props, children);
};
var text = function(el, props, children) {
	return new DomLayerText(el, props, children);
};
var classIdMatch = /([\.#]?[a-zA-Z0-9_:-]+)/;
var nonEmpty = function(input) {
	return input !== '';
};
*/

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

/**
 * A simple api that abstracts vdom api
 *
 * @param   String  el        Tagname with class or id
 * @param   Object  props     Element properties
 * @param   Array   children  List of child nodes
 * @return  VNode
 */
/*
function vdom(el, props, children) {
	if (typeof el === 'String' && props === undefined && children === undefined) {
		return text(el);
	}

	// build attributes
	var new_props = {
		attrs: props
	};

	// split el into tagName and class/id
	var new_el;
	el.split(classIdMatch).filter(nonEmpty).forEach(function(prop) {
		var hint = prop.charAt(0);
		if (hint === '#') {
			new_props.attrs.id = prop;
		} else if (hint === '.') {
			if (!new_props.attrs.class) {
				new_props.attrs.class = {};
			}
			new_props.attrs.class[prop] = true;
		} else {
			new_el = prop;
		}
	});

	return tag(new_el, new_props, children);
};
*/
