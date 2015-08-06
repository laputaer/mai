
/**
 * emitter.js
 *
 * Manage user input event
 */

'use strict';

var Emitter = require('tiny-emitter');
var emitter = new Emitter();

// capture event and prevent default
emitter.capture = function(name, data) {
	var self = this;
	return function(ev) {
		ev.preventDefault();
		self.emit(name, data);
	};
};

module.exports = emitter;
