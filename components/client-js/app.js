
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
App.prototype.init = function() {
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
App.prototype.update = function() {
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
App.prototype.refresh = function() {
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
 * Modify app state
 *
 * @param   Mixed  path  Store key path
 * @param   Mixed  data  New data
 * @return  Void
 */
App.prototype.modify = function(path, data) {
	var self = this;

	self.model.set(path, data);
};

/**
 * Signify app state and view are ready
 *
 * @param   Boolean  state  Ready flag
 * @return  Void
 */
App.prototype.ready = function(state) {
	this.ready_flag = state;
};

/**
 * Check app state and view are ready
 *
 * @return  Boolean
 */
App.prototype.isReady = function() {
	return this.ready_flag;
};
