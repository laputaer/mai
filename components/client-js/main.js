
/**
 * main.js
 *
 * Client-side app entry point
 */

'use strict';

// helpers
var hideImage = require('./helpers/hide-broken-post-image');

// adapative images
require('lazysizes/plugins/respimg/ls.respimg.js');
require('lazysizes/plugins/bgset/ls.bgset.js');
require('lazysizes/plugins/progressive/ls.progressive.js');
require('lazysizes');

// click polyfill
var enableFastClick = require('fastclick');

// svg polyfill
var svgPolyfill = require('svg4everybody');

// fetch and promise polyfills
require('whatwg-fetch');
require('native-promise-only');

// our app
var App = require('./app');

// capture user input
var delegator = require('dom-delegator');

// setup event handlers
var handlers = require('./handlers');

// app kick-off
var domready = require('domready');
domready(init);

function init() {
	var app = new App();
	var doc = document;

	doc.body.addEventListener('lazybeforeunveil', hideImage);
	enableFastClick(doc.body);
	svgPolyfill();
	delegator();
	handlers(app);

	app.init();
};
