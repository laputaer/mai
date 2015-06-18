
/**
 * benchmark.js
 *
 * Simple benchmark helper for development testing
 */

'use strict';

var win = window;
var noop = function() {};

module.exports = Benchmark;

/**
 * Benchmark class
 *
 * @param   Boolean  active  Whether to run benchmark
 * @return  Void
 */
function Benchmark(active) {
	if (!(this instanceof Benchmark)) {
		return new Benchmark(active);
	}

	if (!active) {
		this.start = noop;
		this.incr = noop;
		return this;
	}

	this.active = active || false;

	this.start = function() {
		if (!this.active) {
			return;
		}

		this.first = this.now();
		this.last = this.first;
		this.debug('bench start: 0ms');
	};

	this.incr = function(name) {
		if (!this.active) {
			return;
		}

		name = name || 'unknown';
		var current = this.now();
		this.debug(name + ': ' + Math.round(current - this.last) + 'ms');
		this.last = current;
	};

	this.debug = function(input) {
		console.debug(input);
	};

	this.now = function() {
		if (win.performance) {
			return win.performance.now();
		} else {
			return win.Date.now();
		}
	};

	this.first = this.now();
	this.last = this.first;
	return this;
}
