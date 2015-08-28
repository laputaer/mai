
/**
 * get-user-clubs.js
 *
 * Find clubs owned or joined by a user
 */

module.exports = getUserClubs;

/**
 * Find clubs by membership uid
 *
 * @param   Object  opts  Options { db, uid, select }
 * @return  Array         A list of clubs
 */
function *getUserClubs(opts) {
	var db = opts.db;
	var uid = opts.uid;
	var select = opts.select || {};

	var Club = db.col('clubs');
	var Membership = db.col('memberships');

	var query = {
		uid: uid
	};

	// STEP 1: find memberships
	var memberships = yield Membership.find(query).sort({ created: -1 });

	// STEP 2: get club slugs
	var slugs = memberships.map(function(member) {
		return member.slug;
	});

	// STEP 3: find clubs
	var clubs = yield Club.where('slug').in(slugs).select(select);
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
