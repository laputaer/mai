
/**
 * renderer.js
 *
 * Manage client-side view update
 */

'use strict';

// client-side api
var win = window;
var doc = document;

// template bundle
var templates = require('../templates/index');

// builder files
var builders = {
	home: require('../builders/home')
};

// immutable object
var I = require('icepick');

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

	var data = builders[name](model);
	var vdom = templates.body(I.assign(model, data));

	if (!vdom) {
		return;
	}

	var patches = diff(this.vdomCache, vdom);
	patch(this.nodeCache, patches);
	this.vdomCache = vdom;
};
