
/**
 * get-user-origin.js
 *
 * Provide user oauth profile link
 */

module.exports = helper;

/**
 * Helper
 *
 * @param   Object  user  Local user profile
 * @return  String
 */
function helper(user) {
	if (user.provider === 'twitter' || user.provider === 'github') {
		return 'https://' + user.provider + '.com/' + user.login;
	} else {
		return 'https://' + user.provider + '.com/';
	}
};
