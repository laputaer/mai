
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

	emitter.on('page:load:post', function () {
		loadContent(app, {
			name: 'load_post'
			, key: 'pid'
			, endpoint: 'featured_posts'
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

	emitter.on('page:favorite:create', function (data) {
		createFavorite(app, data.order);
		app.json('PUT', '/posts/' + data.id + '/favorite').then(function (res) {
			if (!res.ok) {
				deleteFavorite(app, data.order);
			}
		});
	});

	emitter.on('page:favorite:remove', function (data) {
		deleteFavorite(app, data.order);
		app.json('DELETE', '/posts/' + data.id + '/favorite').then(function (res) {
			if (!res.ok) {
				createFavorite(app, data.order);
			}
		});
	});
};
