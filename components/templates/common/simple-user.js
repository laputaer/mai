
/**
 * simple-user.js
 *
 * Template for simple user profile (in menu bar)
 */

var h = require('virtual-dom/h');
var svg = require('virtual-dom/virtual-hyperscript/svg');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var user = data.current_user;

	// set avatar size
	var avatar = user.avatar;
	if (user.provider === 'twitter') {
		avatar = avatar.replace('_normal', '_64x64');
	} else if (user.provider === 'github') {
		avatar = avatar + '&s=64';
	}

	// set user pid
	var pid = user.provider.substr(0, 1) + user.id;

	var user = h('div.user', [
		h('div.avatar', {
			style: {
				'background-image': 'url(' + avatar + ')'
			}
		})
		, h('a.link', {
			href: '/u/' + pid
		}, user.login)
	]);

	return user;
};