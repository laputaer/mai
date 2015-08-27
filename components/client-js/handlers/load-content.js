
/**
 * load-content.js
 *
 * Load content using async style
 */

'use strict';

/**
 * Load content from backend
 *
 * @oaram   Object  app   App instance
 * @oaram   Object  opts  { name, key, endpoint, range }
 * @return  Void
 */
module.exports = function loadContent (app, opts) {
	// show hidden data immediately
	var count = app.read(['ui', opts.name]) || 0;
	var limit = 20;
	var skip = count + limit;
	app.modify(['ui', opts.name], skip);
	app.refresh();

	// range support
	var range = 0;
	if (opts.range) {
		var arr = app.read(opts.range);
		range = arr[arr.length - 1]['ts'];
	}

	// load more data in background
	app.load(opts.endpoint, {
		query: {
			skip: skip
			, limit: limit
			, range: range
		}
		, key: opts.key
	});
};
