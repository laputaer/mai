
/**
 * handlers.js
 *
 * Manage client-side events and interactions
 */

var emitter = require('../templates/emitter');
var toggleScroll = require('./helpers/toggle-body-scroll');

var createFavorite = require('./handlers/create-favorite');
var deleteFavorite = require('./handlers/delete-favorite');
var loadContent = require('./handlers/load-content');
var getFormData = require('./handlers/get-form-data');
var formResult = require('./handlers/form-result');

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
		var body = getFormData(app, data);
		app.json('POST', '/clubs', { body: body }).then(function (json) {
			formResult(app, json);
		});
	});
};
