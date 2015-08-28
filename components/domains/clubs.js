
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
var getUserPosts = require('./clubs/get-user-posts');
var getFeaturedClubs = require('./clubs/get-featured-clubs');
var getFeaturedPosts = require('./clubs/get-featured-posts');
var getClubsByIds = require('./clubs/get-clubs-by-ids');
var matchPost = require('./clubs/match-post');
var getTopClubs = require('./clubs/get-top-clubs');
var getHotClubs = require('./clubs/get-hot-clubs');
var getRecentClubs = require('./clubs/get-recent-clubs');
var getRecentPosts = require('./clubs/get-recent-posts');
var getUserClubs = require('./clubs/get-user-clubs');

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
	, getUserPosts: getUserPosts
	, getFeaturedClubs: getFeaturedClubs
	, getFeaturedPosts: getFeaturedPosts
	, getClubsByIds: getClubsByIds
	, matchPost: matchPost
	, getTopClubs: getTopClubs
	, getHotClubs: getHotClubs
	, getRecentClubs: getRecentClubs
	, getRecentPosts: getRecentPosts
	, getUserClubs: getUserClubs
};
