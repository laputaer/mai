
/**
 * renderer.js
 *
 * Take immuntable data model, build virtual dom, render html as model change
 */

'use strict';

// templates
var templates = require('../templates/index');

// vdom to html
var h = require('virtual-dom/h');
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
 * @param   DOM   base  Container dom
 * @return  Void
 */
Renderer.prototype.init = function(base) {
	if (this.vdomCache && this.nodeCache) {
		return;
	}

	this.vdomCache = virtualize(base);
	this.nodeCache = createElement(this.vdomCache);

	var root = base.parentNode;
	root.removeChild(base);
	root.appendChild(this.nodeCache);
};

/**
 * Update dom using vdom diffing 
 *
 * @param   Object  model  Immutable data model
 * @return  Void
 */
Renderer.prototype.update = function(model) {
	if (this.modelCache === model) {
		return;
	}
	this.modelCache = model;

	var vdom;
	// TODO: render new vdom
	if (!vdom) {
		return;
	}

	var patches = diff(this.vdomCache, vdom);
	patch(this.nodeCache, patches);
	this.vdomCache = vdom;
};
