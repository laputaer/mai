
/**
 * match-membership.js
 *
 * Check existing user and club relationship
 */

module.exports = matchMembership;

/**
 * Match membership
 *
 * @param   Object  opts  Options { db, slug, uid }
 * @return  Object        Club data
 */
function *matchMembership(opts) {
	var db = opts.db;
	var Membership = db.col('memberships');

	return yield Membership.findOne({
		slug: opts.slug
		, uid: opts.uid
	});
};
