
/**
 * immutable.js
 *
 * An immutable virtual-dom thunk implementation
 */

module.exports = immutable;

/**
 * Create an immutable thunk
 *
 * @param   Function  fn      Template function
 * @param   Object    data    Input data
 * @param   Boolean   client  Server-side or client-side
 * @return  Object            VNode or Thunk
 */
function immutable(fn, data, client) {
	if (client) {
		return fn(data);
	}

	var key;
	if (typeof data === 'object' && data.hasOwnProperty('key')) {
		key = data.key;
	}

	return new ImmutableThunk(fn, data, key);
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

/**
 * A simple thunk that cache input
 *
 * @param   Function  fn    Template function
 * @param   Object    data  Input data
 * @param   Object    data  Input data  
 * @return  Thunk
 */
function ImmutableThunk(fn, data, key) {
	this.fn = fn;
	this.data = data;
	this.key = key;
}

// see spec: https://github.com/Matt-Esch/virtual-dom/blob/master/docs/thunk.md
ImmutableThunk.prototype.type = 'Thunk';
ImmutableThunk.prototype.render = function(previous) {
	if (!previous || !eq(this.data, previous.data)) {
		return this.fn.call(null, this.data);
	} else {
		return previous.vnode;
	}
};
