
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
 * Initialize app state
 *
 * @return  Promise
 */
App.prototype.init = function() {
	var self = this;

	self.renderer.init({ container: document.querySelector('.page') });

	return self.service.init().then(function(data) {
		self.model.init(data);
		self.renderer.modelCache = self.model.get();
	});
};

/**
 * Update app state
 *
 * @return  Promise
 */
App.prototype.update = function() {
	var self = this;
	var name = router(self.model.get());

	// undefined route, skip
	if (!name) {
		return Promise.resolve(false);
	}

	// otherwise extend page
	return self.service.fetch(name).then(function(data) {
		self.model.sync(data);
		self.renderer.update(name, self.model.get());
	});
};

/**
 * Refresh app view
 *
 * @return  Promise
 */
App.prototype.refresh = function() {
	var self = this;
	var name = router(self.model.get());

	// undefined route, skip
	if (!name) {
		return Promise.resolve(false);
	}

	self.renderer.update(name, self.model.get());
};
