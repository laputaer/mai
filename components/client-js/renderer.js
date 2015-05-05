
/**
 * renderer.js
 *
 * Take immuntable data model, build virtual dom, render html as model change
 */

'use strict';

// templates
var templates = require('../templates/index');

// vdom to html
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

// cache
var modelCache, vdomCache, nodeCache;

module.exports = renderer;

/**
 * Patch HTML using virtual-dom
 *
 * @param   DOM     base   Container dom
 * @param   Object  model  Immutable data model
 * @return  Void
 */
function renderer(base, model) {
	// STEP 1: same html string, skip rendering
	if (modelCache === html) {
		return;
	}

	// STEP 2: cache html
	htmlCache = html;

	// STEP 3: convert html into vdom
	var vdom = h2v(html); 

	// STEP 4: first render
	if (!vdomCache || !nodeCache) {
		// update cache
		vdomCache = vdom;
		nodeCache = createElement(vdom);
		// clean up container
		while (base.firstChild) {
			base.removeChild(base.firstChild);
		}
		// add rendered dom
		base.appendChild(nodeCache);
		return;
	}

	// STEP 5: update view
	var patches = diff(vdomCache, vdom);
	patch(nodeCache, patches);
	vdomCache = vdom;
};
