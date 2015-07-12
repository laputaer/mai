
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
// to debug, set it to true
var bench = require('./benchmark')(true);

// immutable object
var extend = require('xtend');

// vdom to html
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');

// html to vdom
var parser = require('vdom-parser');

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
 * @param   Object  opts  Custom init options
 * @return  Void
 */
Renderer.prototype.init = function(opts) {
	// only allow init once
	if (this.vdomCache && this.nodeCache) {
		return;
	}

	opts = opts || {};
	var container = opts.container || doc.body;

	// parse dom into vdom, and remember container
	bench.start('init');
	this.vdomCache = parser(container, 'id');
	bench.incr('parser done');

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
	// so builder can assume mutable data
	// but also allow template to do immutable check on data.x
	// TODO: eventually we want to avoid doing this
	bench.start('update');
	var data = extend({}, model);

	// handle potential error from vdom builder
	var vdom;
	try {
		bench.incr('copy done');
		data = builders[name](data);
		vdom = builders.doc(data);
	} catch(err) {
		bench.incr('vdom error', err);
	}

	// new vdom empty, skip
	if (!vdom) {
		return;
	}

	// generate patches and apply them
	bench.incr('vdom done');
	var patches = diff(this.vdomCache, vdom);

	bench.incr('diff done', patches);
	this.nodeCache = patch(this.nodeCache, patches);

	// cache new vdom for next diff
	bench.incr('patch done');
	this.vdomCache = vdom;
};
