
/**
 * simple-user.js
 *
 * Template for simple user profile (in menu bar)
 */

var $ = require('../vdom');

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

	var button = $('a.m-button.rounded.navigation' + status, {
		href: '/u/' + user.uid
	}, [
		$('img.m-image', {
			src: user.small_avatar
		})
		, $('span.m-text', user.login)
	]);

	return button;
};