
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
		this.patchFilter = noop;
		return this;
	}

	this.active = active || false;

	this.start = function(name, data) {
		this.first = this._now();
		this.last = this.first;
		this._debug(name + ': 0ms', data);
	};

	this.incr = function(name, data) {
		name = name || 'unknown';
		var current = this._now();
		this._debug(name + ': +' + Math.round(current - this.last) + 'ms, ' + Math.round(current - this.first) + 'ms', data);
		this.last = current;
	};

	this.patchFilter = function(data) {
		var output = {};
		for (var p in data) {
			if (data.hasOwnProperty(p) && data[p] && data[p].type !== 4) {
				output[p] = data[p];
			}
		};

		return output;
	};

	this._debug = function() {
		var args = [];
		for (var i = 0; i < arguments.length; i++) {
			if (!arguments[i]) {
				continue;
			}
			args.push(arguments[i]);
		};

		console.debug.apply(console, args);
	};

	this._now = function() {
		if (win.performance) {
			return win.performance.now();
		} else {
			return win.Date.now();
		}
	};

	this.first = this._now();
	this.last = this.first;
	return this;
}
