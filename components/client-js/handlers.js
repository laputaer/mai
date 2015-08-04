
/**
 * handlers.js
 *
 * Manage client-side events and interactions
 */

var serialize = require('form-serialize');

var doc = document;
var emitter = require('../templates/emitter');
var toggleScroll = require('./helpers/toggle-body-scroll');

var createFavorite = require('./handlers/create-favorite');
var deleteFavorite = require('./handlers/delete-favorite');
var loadContent = require('./handlers/load-content');

module.exports = handlers;

/**
 * Handlers init function
 *
 * @oaram   Object  app  App instance
 * @return  Void
 */
function handlers(app) {
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

	emitter.on('page:tab:change', function (data) {
		app.modify(['ui', data.view], data.order);
		app.refresh();
	});

	emitter.on('page:load:featured-post', function () {
		loadContent(app, {
			name: 'load_post'
			, key: 'pid'
			, endpoint: 'featured_posts'
		});
	});

	emitter.on('page:load:club-posts', function () {
		loadContent(app, {
			name: 'load_post'
			, key: 'pid'
			, endpoint: 'club_posts'
		});
	});

	emitter.on('page:load:user-posts', function () {
		loadContent(app, {
			name: 'load_post'
			, key: 'pid'
			, endpoint: 'user_posts'
		});
	});

	emitter.on('page:load:my-clubs', function () {
		loadContent(app, {
			name: 'load_my_clubs'
			, key: 'slug'
			, endpoint: 'my_clubs'
		});
	});

	emitter.on('page:load:joined-clubs', function () {
		loadContent(app, {
			name: 'load_joined_clubs'
			, key: 'slug'
			, endpoint: 'joined_clubs'
		});
	});

	emitter.on('page:load:hot-clubs', function () {
		loadContent(app, {
			name: 'load_hot_clubs'
			, key: 'slug'
			, endpoint: 'hot_clubs'
		});
	});

	emitter.on('page:load:top-clubs', function () {
		loadContent(app, {
			name: 'load_top_clubs'
			, key: 'slug'
			, endpoint: 'top_clubs'
		});
	});

	emitter.on('page:load:recent-clubs', function () {
		loadContent(app, {
			name: 'load_recent_clubs'
			, key: 'slug'
			, endpoint: 'recent_clubs'
		});
	});

	emitter.on('page:favorite:create', function (data) {
		createFavorite(app, data);
		app.json('PUT', '/posts/' + data.id + '/favorite').then(function (json) {
			if (!json.ok) {
				deleteFavorite(app, data);
			}
		});
	});

	emitter.on('page:favorite:remove', function (data) {
		deleteFavorite(app, data);
		app.json('DELETE', '/posts/' + data.id + '/favorite').then(function (json) {
			if (!json.ok) {
				createFavorite(app, data);
			}
		});
	});

	emitter.on('page:form:submit', function (data) {
		var form = doc.getElementById(data.id);
		var body_raw = serialize(form, { hash: true });
		var body_str = 'csrf_token=' + app.read(['current_user', 'csrf_token']) + '&' + serialize(form);
		app.modify(['ui', 'field_data'], body_raw || {});
		app.json('POST', '/clubs', {
			body: body_str
			, headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function (json) {
			if (!json.ok) {
				app.modify(['ui', 'form_error'], json.message || '');
				app.modify(['ui', 'field_error'], json.data || {});
				app.refresh();
				return;
			}

			app.modify(['ui', 'form_error'], '');
			app.modify(['ui', 'field_error'], {});
			app.modify(['ui', 'form_data'], json.data || {});
			app.refresh();
		});
	});
};
