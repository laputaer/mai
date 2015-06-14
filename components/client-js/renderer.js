
/**
 * renderer.js
 *
 * Manage client-side view update
 */

'use strict';

// client-side api
var win = window;
var doc = document;

// builder files
var builders = {
	doc: require('../builders/doc')
	, home: require('../builders/home')
};

// immutable object
var I = require('icepick');
var extend = require('xtend');

// vdom to html
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

// html to vdom
var virtualize = require('vdom-virtualize');

module.exports = Renderer;

/**
 * Patch HTML using virtual-dom
 *
 * @return  Void
 */
function Renderer() {
	if (!(this instanceof Renderer)) {
		return new Renderer();
	}

	this.vdomCache = null;
	this.nodeCache = null;
	this.modelCache = null;
};

/**
 * Initialize server-rendered dom into vdom
 *
 * @param   Object  container  DOM container
 * @return  Void
 */
Renderer.prototype.init = function(container) {
	if (this.vdomCache && this.nodeCache) {
		return;
	}

	if (!container) {
		container = doc.body;
	}

	//while (container.firstChild) {
	//	container.removeChild(container.firstChild);
	//}

	this.vdomCache = virtualize(container);
	this.nodeCache = container;
};

/**
 * Update dom using vdom diffing 
 *
 * @param   String  name   Builder name
 * @param   Object  model  Immutable data model
 * @return  Void
 */
Renderer.prototype.update = function(name, model) {
	if (this.modelCache === model) {
		return;
	}
	this.modelCache = model;

	// shallow copy into mutable model
	var data = extend({}, model);
	data = builders[name](data);

	var vdom = builders.doc(data, {
		bodyOnly: true
	});

	if (!vdom) {
		return;
	}

	var patches = diff(this.vdomCache, vdom);
	patch(this.nodeCache, patches);
	this.vdomCache = vdom;
};
