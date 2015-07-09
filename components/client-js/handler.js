
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
emitter.on('page:nav', function(data) {
	console.log(data);
});

module.exports = emitter;
