
/**
 * load-content.js
 *
 * Load content using async style
 */

module.exports = function loadContent (app, opts) {
	// show hidden data immediately
	var count = app.read(['ui', opts.name]) || 0;
	var limit = 20;
	var skip = count + limit;
	app.modify(['ui', opts.name], skip);
	app.refresh();

	// load more data in background
	app.load(opts.endpoint, {
		query: {
			skip: skip
			, limit: limit
		}
		, key: opts.key
	});
};
