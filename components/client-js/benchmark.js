
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

	this.active = false;

	this.enable = function () {
		this.active = true;
		this._debug('benchmark enabled');
	}

	this.start = function (name, data) {
		if (!this.active) {
			return;
		}
		this.first = this._now();
		this.last = this.first;
		this._debug(name + ': 0ms', data);
	};

	this.incr = function (name, data) {
		if (!this.active) {
			return;
		}
		name = name || 'unknown';
		var current = this._now();
		this._debug(name + ': +' + Math.round(current - this.last) + 'ms, ' + Math.round(current - this.first) + 'ms', data);
		this.last = current;
	};

	this.patchFilter = function (data) {
		if (!this.active) {
			return;
		}
		var output = {};
		for (var p in data) {
			// filter out prop update and thunk update
			if (data.hasOwnProperty(p) && data[p] && data[p].type !== 4 && data[p].type !== 8) {
				output[p] = data[p];
			}
		};

		return output;
	};

	this._debug = function () {
		var args = [];
		for (var i = 0; i < arguments.length; i++) {
			if (!arguments[i]) {
				continue;
			}
			args.push(arguments[i]);
		};

		console.debug.apply(console, args);
	};

	this._now = function () {
		if (win.performance) {
			return win.performance.now();
		} else {
			return win.Date.now();
		}
	};

	this.first = this._now();
	this.last = this.first;
}
