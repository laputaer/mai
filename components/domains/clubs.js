
/**
 * clubs.js
 *
 * Export clubs domain model
 */

var getUserOwnedClubs = require('./clubs/get-user-owned-clubs');
var getUserJoinedClubs = require('./clubs/get-user-joined-clubs');
var matchClub = require('./clubs/match-club');
var createClub = require('./clubs/create-club');
var searchClubs = require('./clubs/search-clubs');
var matchMembership = require('./clubs/match-membership');
var joinClub = require('./clubs/join-club');

module.exports = {
	getUserOwnedClubs: getUserOwnedClubs
	, getUserJoinedClubs: getUserJoinedClubs
	, matchClub: matchClub
	, createClub: createClub
	, searchClubs: searchClubs
	, matchMembership: matchMembership
	, joinClub: joinClub
};
