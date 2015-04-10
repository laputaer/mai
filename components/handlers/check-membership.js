
/**
 * check-membership.js
 *
 * Check existing user and club relationship
 */

module.exports = checkMembership;

/**
 * Check user membership
 *
 * @return  Object
 */
function *checkMembership() {
	var user = this.user;
	var club = this.club;
	var db = this.db;
	var Membership = db.col('memberships');

	return yield Membership.findOne({
		slug: club.slug
		, uid: user.uid
	});
};
