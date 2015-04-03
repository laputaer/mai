
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
	var profile = h('div.profile', [
		h('img.avatar', {
			src: data.user.avatar
			, alt: data.user.login
		})
		, h('a.link', {
			href: 'https://' + data.user.provider + '.com/' + data.user.login
		}, data.user.name)
		, h('p.line', i18n.t('main.thanks'))
	]);

	return profile;
};