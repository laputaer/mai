
/**
 * form-search.js
 *
 * Template for default form search group
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
	var search = h('div.m-search', [
		h('label.m-label' + data.error, {
			attributes: {
				'for': data.id
			}
		}, i18n.t('club.search-term'))
		, h('input.m-field' + data.error, {
			placeholder: i18n.t('club.search-term-placeholder')
			, name: data.name
			, value: data.value
		})
		, h('button.m-submit', {
			type: 'submit'
		}, i18n.t('club.search-submit'))
		, h('span.m-note', i18n.t('club.search-term-note'))
	]);

	return search;
};