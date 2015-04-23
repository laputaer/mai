
/**
 * cache-users-v1.js
 *
 * Migration script for `users` cache, rev.1
 */

var co = require('co');
var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db, cache, config) {
	var opts = {
		revision: 1
		, name: 'cache_users'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var search = opts.name.split('_')[1] + ':*';
	var keys = yield cache.keys(search);

	var key, data, profile;
	for (var i = 0; i < keys.length; i++) {
		key = keys[i];
		data = yield cache.get(key);
		data = JSON.parse(data);

		profile = {
			name: data.name
			, login: data.login
			, avatar: data.avatar
			, uid: data.uid
			, last_seen: Date.now().toString()
		};

		// delete old key
		yield cache.del(key);

		// set new key
		yield cache.hmset(key, profile);
		yield cache.expire(key, config.session.maxAge);
	}

	// update revision
	yield updateRev(db, opts);
};

