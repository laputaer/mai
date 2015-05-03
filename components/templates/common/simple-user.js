
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
	var status = data.current_path === '/u/' + user.uid ? '.active' : '';

	var button = h('a.m-button.rounded.navigation' + status, {
		href: '/u/' + user.uid
	}, [
		h('div.m-image', {
			style: {
				'background-image': 'url(' + user.small_avatar + ')'
			}
		})
		, h('span.m-text', user.login)
	]);

	return button;
};