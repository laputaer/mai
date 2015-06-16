
/**
 * renderer.js
 *
 * Manage client-side view update
 */

'use strict';

// client-side api
var doc = document;

// builder bundle
var builders = require('../builders/builders');

// immutable object
var extend = require('xtend');

// vdom to html
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');

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
	// only allow init once
	if (this.vdomCache && this.nodeCache) {
		return;
	}

	// use body as container by default
	if (!container) {
		container = doc.body;
	}

	// parse dom into vdom, and remember container
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
	// model not changed, skip
	if (this.modelCache === model) {
		return;
	}

	// cache new model
	this.modelCache = model;

	// shallow copy into mutable model
	var data = extend({}, model);

	// so builder can assult mutable data
	// but also allow template to do immutable check
	data = builders[name](data);

	// data.client flag decides whether body or doc is returned
	var vdom = builders.doc(data);

	// new vdom empty, skip
	if (!vdom) {
		return;
	}

	// generate patches and apply them
	var patches = diff(this.vdomCache, vdom);
	patch(this.nodeCache, patches);

	// cache new vdom for next diff
	this.vdomCache = vdom;
};
