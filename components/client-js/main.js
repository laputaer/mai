
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

// event delegator (capture user input)
var delegator = require('dom-delegator')();
// event emitter (handle user input)
var emitter = require('../templates/emitter');

// kick off
window.addEventListener('DOMContentLoaded', init);

function init() {
	app.init().then(function(data) {
		return app.update();
	}).then(function() {
		app.active = true;
	});
};

// event handlers
emitter.on('page:nav', function() {
	if (!app.active) {
		return;
	}

	app.model.set(['ui', 'nav'], true);
	app.refresh();
});
