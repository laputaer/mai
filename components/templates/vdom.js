
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

var getType = require('../helpers/get-variable-type');
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
 * @param   Mixed  el        Tagname with class or id
 * @param   Mixed  props     Element properties
 * @param   Mixed  children  List of child nodes
 * @return  VNode
 */
/*
function vdom(el, props, children) {
	if (el === 'head') {
		console.log(el, props, children);
	}
	// build attributes
	var new_props, new_children;
	// $('div', 'abc');
	if (getType(props) === 'String' && children === undefined) {
		new_props = {
			attrs: {}
		};
		new_children = [ text(props) ];
	// $('div', { abc: 'abc' });
	} else if (getType(props) === 'Object' && children === undefined) {
		new_props = {
			attrs: props
		};
		new_children = [];
	// $('div', ['abc', $('span', 'abc')]);
	} else if (getType(props) === 'Array' && children === undefined) {
		new_props = {
			attrs: {}
		};
		new_children = [];
		props.forEach(function(child) {
			var node = createNode(child);
			if (node) {
				new_children.push(node);
			}
		});
	// $('div', { abc: 'abc' }, ['abc', $('span', 'abc')]);
	} else if (getType(props) === 'Object' && getType(children) === 'Array') {
		new_props = {
			attrs: props
		};
		new_children = [];
		children.forEach(function(child) {
			var node = createNode(child);
			if (node) {
				new_children.push(node);
			}
		});
	}

	// special case for innerHTML property
	if (new_props.attrs.innerHTML) {
		new_props.props = {};
		new_props.props = {
			innerHTML: new_props.attrs.innerHTML
		};
		delete new_props.attrs.innerHTML;
	}

	// split el into tagName and class/id
	var new_el;
	el.split(classIdMatch).filter(nonEmpty).forEach(function(prop) {
		var hint = prop.substr(0, 1);
		if (hint === '#') {
			new_props.attrs.id = prop.substr(1);
		} else if (hint === '.') {
			if (!new_props.attrs['class']) {
				new_props.attrs['class'] = {};
			}
			new_props.attrs['class'][prop.substr(1)] = true;
		} else {
			new_el = prop;
		}
	});

	return tag(new_el, new_props, new_children);
};
*/

/**
 * Helper function to convert child node recursively
 *
 * @param   Mixed  child  Any valid node value
 * @return  VNode
 */
/*
function createNode(child) {
	var output;
	if (getType(child) === 'String') {
		output = text(child);
	} else if (child instanceof DomLayerTag || child instanceof DomLayerText) {
		output = child;
	} else if (getType(child) === 'Function' && child.name === 'vdom') {
		output = child();
	} else if (getType(child) === 'Function') {
		output = vdom(child());
	}

	return output;
};
*/

