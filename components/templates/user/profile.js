
/**
 * profile.js
 *
 * Template for user profile
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
	// set avatar size
	var avatar = data.user.avatar;
	if (data.user.provider === 'twitter') {
		avatar = avatar.replace('_normal', '_400x400');
	} else if (data.user.provider === 'github') {
		avatar = avatar + '&s=400';
	}

	var i18n = data.i18n;
	var profile = h('div.profile', [
		h('img.avatar', {
			src: avatar
			, alt: data.user.login
		})
		, h('a.link', {
			href: 'https://' + data.user.provider + '.com/' + data.user.login
		}, data.user.name)
		, h('p.line', i18n.t('main.thanks'))
	]);

	return profile;
};