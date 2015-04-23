
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

	// set button status
	var status = '';
	if (data.path === '/u/' + user.uid) {
		status = '.active';
	}

	var button = h('a.m-button.rounded' + status, {
		href: '/u/' + user.uid
	}, [
		h('div.m-image', {
			style: {
				'background-image': 'url(' + avatar + ')'
			}
		})
		, h('span.m-text', user.login)
	]);

	return button;
};