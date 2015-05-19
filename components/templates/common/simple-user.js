
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
	var xss = data.xss;

	var button = h('a.m-button.rounded.navigation' + status, {
		href: '/u/' + xss.path(user.uid)
	}, [
		h('img.m-image', {
			src: user.small_avatar
		})
		, h('span.m-text', xss.data(user.login))
	]);

	return button;
};