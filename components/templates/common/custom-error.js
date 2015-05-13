
/**
 * custom-error.js
 *
 * Template for generic custom error
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
	var error = h('div.m-section', [
		h('p.m-subtitle', data.error_status)
		, h('p.m-line', data.error_message)
		, h('p.m-line', i18n.t('placeholder.suggestion'))
		, h('p.m-line', [
			h('span', i18n.t('placeholder.main-feedback'))
			, h('a.m-link', {
				href: 'https://twitter.com/bitinn'
				, target: '_blank'
			}, [
				h('span.m-text.en', '@bitinn')
			])
		])
		, h('p.m-line', [
			h('span', i18n.t('placeholder.secondary-feedback'))
			, h('a.m-link', {
				href: 'https://github.com/maihq/feedbacks'
				, target: '_blank'
			}, [
				h('span.m-text', i18n.t('placeholder.secondary-feedback-name'))
			])
			, h('span', i18n.t('placeholder.secondary-feedback-action'))
		])
	]);

	return error;
};
