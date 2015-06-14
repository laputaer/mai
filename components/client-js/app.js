
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
 * @return  Void
 */
App.prototype.init = function() {
	var self = this;

	this.renderer.init();

	this.service.init().then(function(data) {
		self.model.init(data);

		//self.renderer.update(self.model.get());
	});
};