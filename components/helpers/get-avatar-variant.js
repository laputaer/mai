
/**
 * get-avatar-variant.js
 *
 * Provide avatar sizing for different providers
 */

module.exports = helper;

/**
 * Helper
 *
 * @param   Object  user  Local user profile
 * @param   Number  size  Avatar size
 * @return  String
 */
function helper(user, size) {
	if (user.provider === 'twitter') {
		return user.avatar.replace('_normal', '_' + size + 'x' + size);
	} else if (user.provider === 'github') {
		return user.avatar + '&s=' + size;
	} else {
		return user.avatar;
	}
};
