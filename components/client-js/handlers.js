
/**
 * handlers.js
 *
 * Manage client-side events and interactions
 */

'use strict';

var doc = document;
var win = window;
var emitter = require('../templates/emitter');
var toggleScroll = require('./helpers/toggle-body-scroll');
var menuEscape = require('./helpers/menu-escape');

var createFavorite = require('./handlers/create-favorite');
var deleteFavorite = require('./handlers/delete-favorite');
var loadContent = require('./handlers/load-content');
var getFormData = require('./handlers/get-form-data');
var formResult = require('./handlers/form-result');
var joinClub = require('./handlers/join-club');
var leaveClub = require('./handlers/leave-club');
var restoreItem = require('./handlers/restore-item');
var deleteItem = require('./handlers/delete-item');
var showShareMenu = require('./handlers/show-share-menu');
var hideShareMenu = require('./handlers/hide-share-menu');

module.exports = handlers;

/**
 * Handlers init function
 *
 * @oaram   Object  app  App instance
 * @return  Void
 */
function handlers(app) {
	emitter.on('page:menu:nav', function () {
		toggleScroll(false);
		menuEscape(emitter, {
			name: 'page:menu:close'
			, enable: true
		});
		app.modify(['ui', 'modal'], 'nav');
		app.refresh();
	});

	emitter.on('page:menu:login', function () {
		toggleScroll(false);
		menuEscape(emitter, {
			name: 'page:menu:close'
			, enable: true
		});
		app.modify(['ui', 'modal'], 'login');
		app.refresh();
	});

	emitter.on('page:menu:options', function () {
		toggleScroll(false);
		menuEscape(emitter, {
			name: 'page:menu:close'
			, enable: true
		});
		app.modify(['ui', 'modal'], 'options');
		app.refresh();
	});

	emitter.on('page:menu:close', function () {
		toggleScroll(true);
		menuEscape(emitter, {
			name: 'page:menu:close'
			, enable: false
		});
		app.modify(['ui', 'modal'], false);
		app.refresh();
	});

	emitter.on('page:tab:change', function (data) {
		app.modify(['ui', data.view], data.order);
		if (data.menu) {
			emitter.emit('page:menu:close');
		}
		app.refresh();
	});

	emitter.on('page:load:featured-post', function () {
		loadContent(app, {
			name: 'load-featured-posts'
			, key: 'pid'
			, endpoint: 'featured_posts'
		});
	});

	emitter.on('page:load:recent-post', function () {
		loadContent(app, {
			name: 'load-recent-posts'
			, key: 'pid'
			, endpoint: 'recent_posts'
		});
	});

	emitter.on('page:load:club-posts', function () {
		loadContent(app, {
			name: 'load-club-posts'
			, key: 'pid'
			, endpoint: 'club_posts'
		});
	});

	emitter.on('page:load:user-posts', function () {
		loadContent(app, {
			name: 'load-user-posts'
			, key: 'pid'
			, endpoint: 'user_posts'
		});
	});

	emitter.on('page:load:my-clubs', function () {
		loadContent(app, {
			name: 'load-my-clubs'
			, key: 'slug'
			, endpoint: 'my_clubs'
		});
	});

	emitter.on('page:load:joined-clubs', function () {
		loadContent(app, {
			name: 'load-joined-clubs'
			, key: 'slug'
			, endpoint: 'joined_clubs'
		});
	});

	emitter.on('page:load:hot-clubs', function () {
		loadContent(app, {
			name: 'load-hot-clubs'
			, key: 'slug'
			, endpoint: 'hot_clubs'
		});
	});

	emitter.on('page:load:top-clubs', function () {
		loadContent(app, {
			name: 'load-top-clubs'
			, key: 'slug'
			, endpoint: 'top_clubs'
		});
	});

	emitter.on('page:load:recent-clubs', function () {
		loadContent(app, {
			name: 'load-recent-clubs'
			, key: 'slug'
			, endpoint: 'recent_clubs'
		});
	});

	emitter.on('page:load:user-stash', function () {
		loadContent(app, {
			name: 'load-user-stash'
			, key: 'sid'
			, endpoint: 'user_stash'
			, range: 'user_stash'
		});
	});

	emitter.on('page:favorite:create', function (data) {
		createFavorite(app, data);
		app.json('PUT', 'favorite_post', data).then(function (json) {
			if (!json.ok) {
				deleteFavorite(app, data);
			}
		});
	});

	emitter.on('page:favorite:remove', function (data) {
		deleteFavorite(app, data);
		app.json('DELETE', 'favorite_post', data).then(function (json) {
			if (!json.ok) {
				createFavorite(app, data);
			}
		});
	});

	emitter.on('page:item:restore', function (data) {
		restoreItem(app, data);
		app.json('PUT', data.route, data).then(function (json) {
			if (!json.ok) {
				deleteItem(app, data);
			}
		});
	});

	emitter.on('page:item:delete', function (data) {
		deleteItem(app, data);
		app.json('DELETE', data.route, data).then(function (json) {
			if (!json.ok) {
				restoreItem(app, data);
			}
		});
	});

	emitter.on('page:club:join', function (data) {
		joinClub(app, data);
		app.json('PUT', 'club_membership', data).then(function (json) {
			if (!json.ok) {
				leaveClub(app, data);
			}
		});
	});

	emitter.on('page:club:leave', function (data) {
		leaveClub(app, data);
		emitter.emit('page:menu:close');
		app.json('DELETE', 'club_membership', data).then(function (json) {
			if (!json.ok) {
				joinClub(app, data);
			}
		});
	});

	emitter.on('page:share:open', function (data) {
		showShareMenu(app, data);
	});

	emitter.on('page:share:close', function (data) {
		hideShareMenu(app, data);
	});

	emitter.on('page:stash:share', function (data) {
		var select = doc.getElementById(data.prefix + '-' + data.sid + '-share-list');
		var slug = select.value;

		// TODO: don't redirect, allow user to share multiple items
		win.location = '/c/' + slug + '?sid=' + data.sid;
	});

	emitter.on('page:form:submit', function (data) {
		var form = doc.getElementById(data.id);
		var body = getFormData(app, form);
		app.modify(['ui', 'form_loading'], true);
		app.refresh();
		app.json('POST', data.route, data, { body: body }).then(function (json) {
			app.modify(['ui', 'form_loading'], false);
			formResult(app, json);
		});
	});
};
