
/**
 * match-app.js
 *
 * Match app profile by aid
 */

module.exports = matchApp;

/**
 * Match app profile
 *
 * @param   Object  opts  Options { db, aid }
 * @return  Object        App profile
 */
function *matchApp(opts) {
	var db = opts.db;
	var App = db.col('apps');

	return yield App.findOne({
		aid: opts.aid
	});
};
