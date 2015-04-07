
/**
 * search-club.js
 *
 * Template for default search club section
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
	var club = h('div.club-search', [
		h('form.m-form', {
			action: '/club/search'
			, method: 'GET'
		}, [
			h('label.m-label', {
				attributes: {
					'for': 'club-search'
				}
			}, i18n.t('club.search-title'))
			, h('input.m-input', {
				placeholder: i18n.t('club.search-placeholder')
				, name: 'q'
				, id: 'club-search'
			})
			, h('button.m-submit', {
				type: 'submit'
			}, i18n.t('club.search-submit'))
			, h('span.m-note', i18n.t('club.search-note'))
		])
	]);

	return club;
};