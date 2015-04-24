
/**
 * clubs.js
 *
 * Export clubs domain model
 */

var getUserOwnedClubs = require('./clubs/get-user-owned-clubs');
var getUserJoinedClubs = require('./clubs/get-user-joined-clubs');

module.exports = {
	getUserOwnedClubs: getUserOwnedClubs
	, getUserJoinedClubs: getUserJoinedClubs
};
