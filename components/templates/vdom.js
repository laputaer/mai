
/**
 * vdom.js
 *
 * A virtual-dom compatibility layer
 */

var h = require('virtual-dom/h');
var svg = require('virtual-dom/virtual-hyperscript/svg');
var svg_tags = JSON.stringify(require('svg-tags'));

/*
var element = require('deku').element;
var getType = require('../helpers/get-variable-type');
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
	var hint = el.split(/(\.|#)+/);
	if (svg_tags.indexOf(hint[0]) !== -1) {
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
	// build attributes
	var new_props, new_children;
	// vdom('div', 'abc');
	if (getType(props) === 'String' && children === undefined) {
		new_props = {};
		new_children = [ props ];
	// vdom('div', vnode);
	} else if (getType(props) === 'Object' && props.tagName) {
		new_props = {};
		new_children = [ props ];
	// vdom('div', { abc: 'abc' });
	} else if (getType(props) === 'Object' && children === undefined) {
		new_props = props;
		new_children = [];
	// vdom('div', ['abc', $('span', 'abc')]);
	} else if (getType(props) === 'Array' && children === undefined) {
		new_props = {};
		new_children = [];
		props.forEach(function(child) {
			var node = createNode(child);
			if (node) {
				new_children.push(node);
			}
		});
	// vdom('div', { abc: 'abc' }, ['abc', $('span', 'abc')]);
	// vdom('div', { abc: 'abc' }, 'abc');
	} else if (getType(props) === 'Object') {
		new_props = props;
		new_children = [];
		if (getType(children) !== 'Array') {
			new_children.push(children);
		} else {
			children.forEach(function(child) {
				var node = createNode(child);
				if (node) {
					new_children.push(node);
				}
			});
		}
	}

	// split el into tagName and class/id
	var new_el;
	el.split(classIdMatch).filter(nonEmpty).forEach(function(prop) {
		var hint = prop.substr(0, 1);
		if (hint === '#') {
			new_props.id = prop.substr(1);
		} else if (hint === '.') {
			if (!new_props.class) {
				new_props.class = {};
			}
			new_props.class[prop.substr(1)] = true;
		} else {
			new_el = prop;
		}
	});

	return element(new_el, new_props, new_children);
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

	// string content
	if (getType(child) === 'String') {
		output = child;
	// vnode
	} else if (getType(child) === 'Object' && child.tagName) {
		output = child;
	// function
	} else if (getType(child) === 'Function') {
		output = vdom(child());
	}

	return output;
};
*/

