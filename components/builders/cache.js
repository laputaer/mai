
/**
 * cache.js
 *
 * An cached virtual-dom thunk implementation
 */

module.exports = cache;

/**
 * Create a cache thunk
 *
 * @param   Function  fn    Template function
 * @param   Object    data  Input data
 * @return  Object          VNode or Thunk
 */
function cache(fn, data) {
	// render without thunk on server-side
	if (typeof data !== 'object' || !data.client) {
		return fn(data);
	}

	return new CacheThunk(fn, data);
};

/**
 * A simple thunk that cache input
 *
 * @param   Function  fn    Template function
 * @param   Object    data  Input data
 * @return  Thunk
 */
function CacheThunk(fn, data) {
	this.fn = fn;
	this.data = data;
}

// see spec: https://github.com/Matt-Esch/virtual-dom/blob/master/docs/thunk.md
CacheThunk.prototype.type = 'Thunk';
CacheThunk.prototype.render = function(previous) {
	if (!previous) {
		return this.fn.call(null, this.data);
	} else {
		return previous.vnode;
	}
};
