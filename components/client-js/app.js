
/**
 * app.js
 *
 * Manage client-side app lifecycle
 */

'use strict';

var Service = require('./service');
var Model = require('./model');
var Renderer = require('./renderer');
var router = require('./router');

module.exports = App;

/**
 * App class
 *
 * @return  Void
 */
function App() {
	if (!(this instanceof App)) {
		return new App();
	}

	this.service = new Service();
	this.model = new Model();
	this.renderer = new Renderer();
}

/**
 * Initialize app state and view
 *
 * @return  Promise
 */
App.prototype.init = function () {
	var self = this;

	// init vdom and dom cache
	self.renderer.init({ container: document.querySelector('.page') });

	// contact backend service
	return self.service.init().then(function(data) {
		// init data store, such as asset version and current user
		self.model.init(data);
	});
};

/**
 * Update app state and view
 *
 * @return  Promise
 */
App.prototype.update = function () {
	var self = this;
	var model = self.model.get();

	// error page
	if (model.error_status && model.error_message) {
		self.renderer.update(false, model);
		return Promise.resolve(1);
	}

	// match current route
	var route = router(model);
	if (!route) {
		return Promise.resolve(2);
	}

	// found route, contact backend service
	return self.service.sync(route).then(function(data) {
		// update data store, such as page-specific content
		self.model.update(data);
		// update view using current model
		self.renderer.update(route.name, self.model.get());
		// debug purpose
		return 3;
	});
};

/**
 * Refresh app view
 *
 * @return  Promise
 */
App.prototype.refresh = function () {
	var self = this;
	var model = self.model.get();

	// error page
	if (model.error_status && model.error_message) {
		self.renderer.update(false, model);
		return Promise.resolve(1);
	}

	// match current route
	var route = router(model);
	if (!route) {
		return Promise.resolve(2);
	}

	// trigger view update
	self.renderer.update(route.name, self.model.get());
	return Promise.resolve(3);
};

/**
 * Read app state
 *
 * @param   Mixed   path  Store key path
 * @return  Object
 */
App.prototype.read = function (path) {
	var self = this;

	return self.model.get(path);
};

/**
 * Modify app state
 *
 * @param   Mixed   path  Store key path
 * @param   Mixed   data  New data
 * @return  Object
 */
App.prototype.modify = function (path, data) {
	var self = this;

	return self.model.set(path, data);
};

/**
 * Load data from backend and push onto app store
 *
 * @param   String   name  Backend service
 * @param   Object   opts  Optional parameters
 * @return  Promise
 */
App.prototype.load = function (name, opts) {
	var self = this;

	// match current route
	var route = router(self.model.get());
	if (!route) {
		return Promise.resolve(null);
	}

	// contact backend service
	return self.service.fetch(name, opts.query, route.params).then(function (data) {
		if (data.endpoint.ok && Array.isArray(data.endpoint.data)) {
			data.endpoint.data.forEach(function (item) {
				self.model.append(name, item, opts.key);
			});
		}
	});
};

/**
 * Send request to backend and retrieve data
 *
 * @param   String   method  Request method
 * @param   String   url     Backend service endpoint
 * @param   Object   opts    Optional parameters
 * @return  Promise
 */
App.prototype.json = function (method, url, opts) {
	var self = this;

	opts = opts || {};
	opts.method = method || 'GET';

	// contact backend service, get back json result
	return self.service.send(url, opts).then(function (res) {
		if (!res.ok) {
			return {};
		}
		return res.json();
	}).then(function (json) {
		if (!json) {
			return {};
		}
		return json;
	});
};
