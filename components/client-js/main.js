
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

var domready = require('domready');

// app lifecycle
var App = require('./app');
var app = new App();

// event delegator (capture user input)
var delegator = require('dom-delegator')();
// event emitter (handle user input)
var emitter = require('../templates/emitter');

// kick off
domready(init);

function init() {
	app.init().then(function() {
		return app.update();
	}).then(function() {
		app.ready(true);
	});
};

// event handlers
emitter.on('page:nav:open', function() {
	if (!app.isReady()) {
		return;
	}

	app.modify(['ui', 'nav'], true);
	app.refresh();
});

emitter.on('page:nav:close', function() {
	if (!app.isReady()) {
		return;
	}

	app.modify(['ui', 'nav'], false);
	app.refresh();
});
