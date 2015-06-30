
/**
 * main.js
 *
 * Client-side app entry point
 */

'use strict';

// third-party modules
require('lazysizes/plugins/respimg/ls.respimg.js');
require('lazysizes/plugins/bgset/ls.bgset.js');
require('lazysizes');

// polyfills
require('./vendor/svg4everybody');
require('whatwg-fetch');
require('native-promise-only');

// app lifecycle
var App = require('./app');
var app = new App();

// kick off
window.addEventListener('DOMContentLoaded', init);

function init() {
	/*
	app.init().then(function() {
		return app.update();
	}).then(function() {

	});
	*/
};
