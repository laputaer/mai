
/**
 * main.js
 *
 * Client-side app entry point
 */

'use strict';

// third-party modules
require('lazysizes/plugins/respimg/ls.respimg.js');
require('lazysizes/plugins/bgset/ls.bgset.js');
require('lazysizes/plugins/progressive/ls.progressive.js');
require('lazysizes');

// polyfills
var enableFastClick = require('fastclick');
var svgPolyfill = require('svg4everybody');
require('whatwg-fetch');
require('native-promise-only');

// event delegator (capture user input)
require('dom-delegator')();

// app lifecycle
var App = require('./app');
var app = new App();

// app handlers
var handlers = require('./handlers');
handlers(app);

// app kick-off
var domready = require('domready');
domready(init);

function init() {
	svgPolyfill();
	enableFastClick(document.body);

	app.init().then(function () {
		return app.update();
	});
};
