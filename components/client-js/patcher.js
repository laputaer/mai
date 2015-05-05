
/**
 * patcher.js
 *
 * Take HTML as string, convert into virtual dom and cache, update as HTML change
 */

'use strict';

// templates
var templates = require('../templates/index');

// vdom to html
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

var htmlCache, vdomCache, nodeCache;

module.exports = patcher;

/**
 * Patch HTML using virtual-dom
 *
 * @param   DOM     base  Container dom
 * @param   String  html  Input HTML string
 * @return  Void
 */
function patcher(base, html) {
	// STEP 1: same html string, skip rendering
	if (htmlCache === html) {
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
