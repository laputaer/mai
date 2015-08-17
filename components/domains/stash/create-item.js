
/**
 * create-item.js
 *
 * Create a stash item given data
 */

var cuid = require('cuid');

module.exports = createItem;

/**
 * Create an item in stash
 *
 * @param   Object  opts  Options { db, user, body }
 * @return  Object        The new item
 */
function *createItem(opts) {
	var db = opts.db;
	var user = opts.user;
	var body = opts.body;

	var User = db.col('users');
	var Stash = db.col('stash');
	var sid = cuid();

	// STEP 1: update user stash count
	yield User.update({
		uid: user.uid
	}, {
		stash_count: user.stash_count ? user.stash_count + 1 : 1;
	});

	// STEP 2: create item
	var item = {
		sid: sid
		, user: user.uid
		, url: body.url
		, title: body.title
		, summary: body.summary
		, created: new Date()
		, updated: new Date()
	}
	yield Stash.insert(item);

	// STEP 3: get item
	return yield Stash.findOne({
		sid: sid
	});
};
