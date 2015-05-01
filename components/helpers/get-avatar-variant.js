
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
		// twitter only support these 2 sizes
		if (size === 200 || size === 400) {
			return user.avatar.replace('_normal', '_' + size + 'x' + size);
		} else if (size > 400) {
			return user.avatar.replace('_normal', '');
		} else if (size > 200 && size < 400) {
			return user.avatar.replace('_normal', '_400x400');
		} else if (size > 100 && size < 200) {
			return user.avatar.replace('_normal', '_200x200');
		}
		return user.avatar;

	} else if (user.provider === 'github') {
		// github support all sizes
		return user.avatar + '&s=' + size;
	}

	return user.avatar;
};
