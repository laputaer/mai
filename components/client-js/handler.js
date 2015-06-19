
/**
 * handler.js
 *
 * Manage user input event
 */

// global event delegator
var delegator = require('dom-delegator');
delegator();

// global emitter
var emitter = require('../templates/emitter');

// event handlers
emitter.on('test-event', function(data) {
	console.log(data);
});

module.exports = emitter;
