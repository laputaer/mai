
/**
 * handler.js
 *
 * Manage user input event
 */

var emitter = require('../templates/emitter');

emitter.on('test-event', function(data) {
	console.log(data);
});

module.exports = emitter;
