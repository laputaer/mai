
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
		uid: user
	}, {
		$inc: {
			stash_count: 1
		}
	});

	// STEP 2: create item
	var item = {
		sid: sid
		, user: user
		, url: body.url
		, created: new Date()
		, updated: new Date()
	}

	if (body.title) {
		item.title = body.title;
	}

	if (body.favicon) {
		item.favicon = body.favicon;
	}

	// STEP 3: insert item
	yield Stash.insert(item);

	// STEP 4: get new item
	return yield Stash.findOne({
		sid: sid
	});
};
