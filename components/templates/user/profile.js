
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
	var i18n = data.i18n;
	var user = data.user;

	// set avatar size
	var avatar = user.avatar;
	if (user.provider === 'twitter') {
		avatar = avatar.replace('_normal', '_400x400');
	} else if (user.provider === 'github') {
		avatar = avatar + '&s=400';
	}

	var profile = h('div.profile', [
		h('div.avatar', {
			style: {
				'background-image': 'url(' + avatar + ')'
			}
		})
		, h('p.name', user.name)
		, h('p.level', i18n.t('user-profile.faith', {
			current: 0
			, base: 15
		}))
		, data.user_from
	]);

	return profile;
};