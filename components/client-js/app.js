
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

	// match current route
	var name = router(self.model.get());
	if (!name) {
		return Promise.resolve(null);
	}

	// found route, contact backend service
	return self.service.sync(name).then(function(data) {
		// update data store, such as page-specific content
		self.model.update(data);
		// update view using current model
		self.renderer.update(name, self.model.get());
	});
};

/**
 * Refresh app view
 *
 * @return  Void
 */
App.prototype.refresh = function () {
	var self = this;

	// match current route
	var name = router(self.model.get());
	if (!name) {
		return Promise.resolve(false);
	}

	// trigger view update
	self.renderer.update(name, self.model.get());
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
 * Signify app state and view are ready
 *
 * @param   Boolean  state  Ready flag
 * @return  Void
 */
App.prototype.ready = function (state) {
	this.ready_flag = state;
};

/**
 * Check app state and view are ready
 *
 * @return  Boolean
 */
App.prototype.isReady = function () {
	return this.ready_flag;
};

/**
 * Load data from backend and push onto app store and update view
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
	return self.service.fetch(name, opts.query).then(function (data) {
		if (data.endpoint.ok) {
			// update data store
			self.model.append(name, data.endpoint.data, opts.key);
			// update view using current model
			self.renderer.update(route, self.model.get());
		}
	});
};

/**
 * Send request to backend using given method
 *
 * @param   String   url   Backend service endpoint
 * @param   Object   opts  Optional parameters
 * @return  Promise
 */
App.prototype.send = function (url, opts) {
	var self = this;

	// contact backend service, get back result
	return self.service.send(url, opts).then(function (res) {
		if (!res.ok) {
			return;
		}
		return res.json();
	}).then(function (json) {
		if (!json) {
			return;
		}
		return json;
	});
};
