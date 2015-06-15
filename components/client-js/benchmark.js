
/**
 * benchmark.js
 *
 * Simple benchmark helper for development testing
 */

'use strict';

var win = window;

module.exports = Benchmark;

/**
 * Benchmark class
 *
 * @return  Void
 */
function Benchmark() {
	if (!(this instanceof Benchmark)) {
		return new Benchmark();
	}

	this.first = win.performance.now();
	this.last = this.first;
}

Benchmark.prototype.start = function() {
	this.first = win.performance.now();
	this.last = this.first;
	console.log('bench start: 0ms');
};

Benchmark.prototype.stop = function(name) {
	name = name || 'unknown';
	this.last = win.performance.now();
	console.log(name + ': ' + Math.round(this.last - this.first) + 'ms');
};

Benchmark.prototype.incr = function(name) {
	name = name || 'unknown';
	var current = win.performance.now();
	console.log(name + ': ' + Math.round(current - this.last) + 'ms');
	this.last = current;
};
