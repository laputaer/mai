
/**
 * renderer.js
 *
 * Manage client-side view update
 */

'use strict';

// client-side api
var win = window;
var doc = document;

// templates
var builder = require('./builder');

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
 * @param   DOM   base  Initial dom
 * @return  Void
 */
Renderer.prototype.init = function(base) {
	if (!base) {
		base = doc.body;
	}

	if (this.vdomCache && this.nodeCache) {
		return;
	}

	this.vdomCache = virtualize(base);
	this.nodeCache = base;
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
	console.log(model);

	var vdom = builder(model);
	if (!vdom) {
		return;
	}

	var patches = diff(this.vdomCache, vdom);
	patch(this.nodeCache, patches);
	this.vdomCache = vdom;
};
