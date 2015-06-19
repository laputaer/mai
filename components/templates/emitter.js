
/**
 * emitter.js
 *
 * Manage user input event
 */

'use strict';

var Emitter = require('tiny-emitter');
var emitter = new Emitter();

// create an event handler that emit a custon event when fired
emitter.fire = function(name, data) {
	var self = this;
	return function() {
		self.emit(name, data);
	};
};

module.exports = emitter;
