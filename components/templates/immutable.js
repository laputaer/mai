
/**
 * immutable.js
 *
 * An immutable virtual-dom thunk implementation
 */

var extend = require('xtend');

module.exports = immutable;

/**
 * Create an immutable thunk
 *
 * @param   Function  fn    Template function
 * @param   Object    data  Input data
 * @param   Object    opts  Addition runtime options
 * @return  Object          VNode or Thunk
 */
function immutable(fn, data, opts) {
	data = data || {};
	opts = opts || {};

	// don't use immutable when list is small or when rendering on server-side
	if (!opts.client || !opts.count || opts.count < 50) {
		return fn(extend(data, opts));
	}

	return new ImmutableThunk(fn, data, opts);
};

/**
 * A helper for immutable data comparison
 *
 * @param   Object   current   New data
 * @param   Object   previous  Cached data
 * @return  Boolean
 */
function eq(current, previous) {
	try {
		// input is object and freezed
		if (typeof current === 'object' && Object.isFrozen(current)) {
			return current === previous;
		}
		// not immutable object
		return false;
	} catch(err) {
		// es5 only: isFrozen may throw error on non-object
		return false;
	}
};

// see spec: https://github.com/Matt-Esch/virtual-dom/blob/master/docs/thunk.md

/**
 * A simple thunk that cache input
 *
 * @param   Function  fn    Template function
 * @param   Object    data  Input data
 * @param   Object    opts  Addition runtime options
 * @return  Thunk
 */
function ImmutableThunk(fn, data, opts) {
	this.fn = fn;
	this.data = data;
	this.opts = opts;
}

ImmutableThunk.prototype.type = 'Thunk';
ImmutableThunk.prototype.render = function(previous) {
	// new node or data changed, re-render
	if (!previous || !eq(this.data, previous.data)) {
		return this.fn.call(null, extend(this.data, this.opts));
	// otherwise return cached vdom
	} else {
		return previous.vnode;
	}
};
