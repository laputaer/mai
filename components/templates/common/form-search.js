
/**
 * form-search.js
 *
 * Template for default form search group
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var search = $('div.m-search', [
		$('label.m-label' + data.error, {
			attributes: {
				'for': data.id
			}
		}, i18n.t('club.search-term'))
		, $('input.m-field' + data.error, {
			placeholder: i18n.t('club.search-term-placeholder')
			, name: data.name
			, value: data.value
		})
		, $('button.m-submit', {
			type: 'submit'
		}, i18n.t('club.search-submit'))
		, $('span.m-note', i18n.t('club.search-term-note'))
	]);

	return search;
};