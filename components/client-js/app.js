
/**
 * app.js
 *
 * Manage client-side app lifecycle
 */

'use strict';

var Service = require('./service');
var Model = require('./model');
var Renderer = require('./renderer');
var Event = require('./event');
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

	self.renderer.init();

	return self.service.init().then(function(data) {
		return self.model.init(data);
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

	// unknown route, skip
	if (!name) {
		return;
	}

	return self.service.fetch(name).then(function(data) {
		self.model.sync(data);
		self.renderer.update(name, self.model.get());
	});
};
