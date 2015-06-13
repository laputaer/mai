
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
}

/**
 * Initialize app state
 *
 * @return  Void
 */
App.prototype.init = function() {
	this.service.init().then(function(data) {
		console.log(data);
	});
};