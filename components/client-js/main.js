
/**
 * main.js
 *
 * Client-side app entry point
 */

'use strict';

// third-party modules
var respimgPolyfill = require('lazysizes/plugins/respimg/ls.respimg.js');
var lazySizes = require('lazysizes');

// polyfills
require('./vendor/svg4everybody');
require('whatwg-fetch');
require('native-promise-only');

// app lifecycle
var App = require('./app');

// kick off
window.addEventListener('DOMContentLoaded', init);

function init() {
	app();
};
