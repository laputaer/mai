
/**
 * update-club.js
 *
 * Update a club given data
 */

module.exports = updateClub;

/**
 * Update and return a club
 *
 * @param   Object  opts  Options { db, data, slug, embed }
 * @return  Object        Club data
 */
function *updateClub(opts) {
	var db = opts.db;
	var data = opts.data;
	var slug = opts.slug;
	var embed = opts.embed;
	var Club = db.col('clubs');
	var Membership = db.col('memberships');
	var Post = db.col('posts');

	// STEP 1: update club
	var club = {
		title: data.title
		, intro: data.intro || ''
		, logo: data.logo || ''
		, updated: new Date()
	}

	if (!data.logo) {
		club.embed = null;
	}

	if (embed) {
		club.embed = embed;
	}

	if (data.slug !== slug) {
		club.slug = data.slug
	}

	yield Club.update({
		slug: slug
	}, club);

	// STEP 2: update membership and posts
	if (club.slug) {
		yield Membership.update({
			slug: slug
		}, {
			slug: club.slug
		}, {
			multi: true
		});

		yield Post.update({
			club: slug
		}, {
			club: club.slug
			, club_name: club.title
		}, {
			multi: true
		});
	}

	// STEP 3: return new club data
	return yield Club.findOne({
		slug: club.slug || slug
	});
};
