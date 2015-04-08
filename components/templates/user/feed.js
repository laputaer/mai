
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
	// TODO: we should avoid inline html
	var feed = h('div.feed', [
		h('p.line', i18n.t('user-profile.placeholder-1'))
		, h('p.line', {
			innerHTML: i18n.t('user-profile.placeholder-2', {
				feedback: '<a href="https://github.com/maihq/feedbacks" class="link">Github</a>'
				, developer: '<a href="https://twitter.com/bitinn" class="link">@bitinn</a>'
			})
		})
	]);

	return feed;
};