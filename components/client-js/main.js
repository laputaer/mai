
/**
 * main.js
 *
 * Client-side app
 */

'use strict';

// modules
var respimgPolyfill = require('lazysizes/plugins/respimg/ls.respimg.js');
var lazySizes = require('lazysizes');

// polyfills
require('./vendor/svg4everybody');
require('whatwg-fetch');
require('native-promise-only');

// model
var Model = require('./model');
var mainModel = new Model();

//var Renderer = require('./renderer');
//var bodyRenderer = new Renderer();

window.addEventListener('DOMContentLoaded', init);

function init() {
	//mainModel.sync();
};
