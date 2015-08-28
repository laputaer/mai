
/**
 * leave-club.js
 *
 * Update club membership status
 */

'use strict';

/**
 * Leave club
 *
 * @oaram   Object  app   App instance
 * @oaram   Object  data  Event data
 * @return  Void
 */
module.exports = function leaveClub (app, data) {
	var profile_path = 'club_profile';
	var profile = app.read(profile_path) || {};
	app.modify([profile_path, 'members'], profile.members - 1);
	app.modify([profile_path, 'points'], profile.points - 2);
	app.modify([profile_path, 'current_user_member'], false);
	app.refresh();
};
