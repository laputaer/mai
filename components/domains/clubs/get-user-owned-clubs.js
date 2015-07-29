
/**
 * get-user-owned-clubs.js
 *
 * Find clubs created by a user
 */

module.exports = getUserOwnedClubs;

/**
 * Find clubs by membership uid
 *
 * @param   Object  opts  Options { db, uid, limit, range }
 * @return  Array         A list of clubs
 */
function *getUserOwnedClubs(opts) {
	var db = opts.db;
	var uid = opts.uid;
	var limit = opts.limit;
	var range = opts.range;

	var Club = db.col('clubs');
	var Membership = db.col('memberships');

	var query = {
		uid: uid
		, type: 'owner'
	};

	if (range > 0) {
		query.created = {
			'$lt': range
		};
	}

	// STEP 1: find memberships
	var memberships = yield Membership.find(query).sort({ created: -1 }).limit(limit);

	// STEP 2: get club slugs
	var slugs = memberships.map(function(member) {
		return member.slug;
	});

	// STEP 3: find clubs
	var clubs = yield Club.where('slug').in(slugs);
	var output = [];

	// STEP 4: order result
	clubs.forEach(function (club) {
		var pos = slugs.indexOf(club.slug);
		output[pos] = club;
	});

	// STEP 5: normalized array
	output = output.filter(function(value) {
		return !!value;
	});

	return output;
};
