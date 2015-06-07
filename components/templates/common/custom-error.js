
/**
 * custom-error.js
 *
 * Template for generic custom error
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
	var i18n = data.i18n;
	var error = $('div.m-section', [
		$('p.m-subtitle', data.error_status)
		, $('p.m-line', data.error_message)
		, $('p.m-line', i18n.t('placeholder.suggestion'))
		, $('p.m-line', [
			$('span', i18n.t('placeholder.main-feedback'))
			, $('a.m-link', {
				href: 'https://twitter.com/bitinn'
				, target: '_blank'
			}, [
				$('span.m-text.m-latin', '@bitinn')
			])
		])
		, $('p.m-line', [
			$('span', i18n.t('placeholder.secondary-feedback'))
			, $('a.m-link', {
				href: 'https://github.com/maihq/feedbacks'
				, target: '_blank'
			}, [
				$('span.m-text', i18n.t('placeholder.secondary-feedback-name'))
			])
			, $('span', i18n.t('placeholder.secondary-feedback-action'))
		])
	]);

	return error;
};
