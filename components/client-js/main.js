
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
require('dom-delegator')();
// event emitter (handle user input)
var emitter = require('../templates/emitter');

// kick off
domready(init);

function init() {
	app.init().then(function () {
		return app.update();
	}).then(function () {
		app.ready(true);
	});
};

// event handlers
emitter.on('page:nav:open', function () {
	toggleScroll(false);
	app.modify(['ui', 'modal'], 'nav');
	app.refresh();
});

emitter.on('page:nav:close', function () {
	toggleScroll(true);
	app.modify(['ui', 'modal'], false);
	app.refresh();
});

emitter.on('page:login:open', function () {
	toggleScroll(false);
	app.modify(['ui', 'modal'], 'login');
	app.refresh();
});

emitter.on('page:login:close', function () {
	toggleScroll(true);
	app.modify(['ui', 'modal'], false);
	app.refresh();
});

emitter.on('page:load:post', function () {
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

// TODO: can be avoid logic here
emitter.on('page:favorite:create', function (data) {
	app.send('/posts/' + data.id + '/favorite', {
		method: 'PUT'
	}).then(function (res) {
		if (!res || !res.ok) {
			return;
		}

		var fav_point_path = ['featured_posts', data.order, 'fav_point'];
		var fav_point = app.read(fav_point_path);
		app.modify(fav_point_path, fav_point + 1);
		app.modify(['featured_posts', data.order, 'current_user_fav'], true);
		app.refresh();
	});
});

emitter.on('page:favorite:remove', function (data) {
	app.send('/posts/' + data.id + '/favorite', {
		method: 'DELETE'
	}).then(function (res) {
		if (!res || !res.ok) {
			return;
		}

		var fav_point_path = ['featured_posts', data.order, 'fav_point'];
		var fav_point = app.read(fav_point_path);
		app.modify(fav_point_path, fav_point - 1);
		app.modify(['featured_posts', data.order, 'current_user_fav'], false);
		app.refresh();
	});
});
