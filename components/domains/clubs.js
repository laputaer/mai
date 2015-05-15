
/**
 * clubs.js
 *
 * Export clubs domain model
 */

var getUserOwnedClubs = require('./clubs/get-user-owned-clubs');
var getUserJoinedClubs = require('./clubs/get-user-joined-clubs');
var matchClub = require('./clubs/match-club');
var createClub = require('./clubs/create-club');
var updateClub = require('./clubs/update-club');
var searchClubs = require('./clubs/search-clubs');
var matchMembership = require('./clubs/match-membership');
var joinClub = require('./clubs/join-club');
var leaveClub = require('./clubs/leave-club');
var createClubPost = require('./clubs/create-club-post');
var getClubPosts = require('./clubs/get-club-posts');
var getPosts = require('./clubs/get-posts');
var getRankedClubs = require('./clubs/get-ranked-clubs');

module.exports = {
	getUserOwnedClubs: getUserOwnedClubs
	, getUserJoinedClubs: getUserJoinedClubs
	, matchClub: matchClub
	, createClub: createClub
	, updateClub: updateClub
	, searchClubs: searchClubs
	, matchMembership: matchMembership
	, joinClub: joinClub
	, leaveClub: leaveClub
	, createClubPost: createClubPost
	, getClubPosts: getClubPosts
	, getPosts: getPosts
	, getRankedClubs: getRankedClubs
};
