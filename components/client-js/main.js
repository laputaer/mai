
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

// helpers
var toggleScroll = require('./helpers/toggle-body-scroll');

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
	toggleScroll(false);
	app.modify(['ui', 'modal'], 'nav');
	app.refresh();
});

emitter.on('page:nav:close', function() {
	toggleScroll(true);
	app.modify(['ui', 'modal'], false);
	app.refresh();
});

emitter.on('page:login:open', function() {
	toggleScroll(false);
	app.modify(['ui', 'modal'], 'login');
	app.refresh();
});

emitter.on('page:login:close', function() {
	toggleScroll(true);
	app.modify(['ui', 'modal'], false);
	app.refresh();
});

emitter.on('page:load:post', function() {
	var count = app.read(['ui', 'load_post']) || 0;
	count += 10;
	app.modify(['ui', 'load_post'], count);

	app.load('featured_posts', {
		query: {
			skip: count
		}
		, key: 'pid'
	});
});
